from plotly.subplots import make_subplots
import plotly.graph_objects as go
import psycopg2 as pg
import colorsys
import collections
import os

def connect_to_db():
    connection = pg.connect(host="ec2-184-72-235-159.compute-1.amazonaws.com",
                            database="d1aih0igo359na",
                            user="tccnckmtjefvaf",
                            port="5432",
                            password=os.environ['DB_PASSWORD'])
    return connection


connection = connect_to_db()
cursor = connection.cursor()
cursor.execute("Select background_red,background_green,background_blue, user_rating, foreground_red from results")
black_data_points = []
white_data_points = []
score_by_text_color_by_background_color = collections.defaultdict(lambda: {'black': [], 'white': []})

for row in cursor.fetchall():
    hls = colorsys.rgb_to_hls(row[0]/255.0,row[1]/255.0,row[2]/255.0)
    black_text = row[4] == 0
    data_points = black_data_points if black_text else white_data_points
    data_points.append({'hue': hls[0], 'lum': hls[1], 'sat': hls[2], 'rating': row[3]})
    if black_text:
        score_by_text_color_by_background_color[hls]['black'].append(row[3])
    else:
        score_by_text_color_by_background_color[hls]['white'].append(row[3])


hue_black = [obj['hue'] for obj in black_data_points]
sat_black = [obj['sat'] for obj in black_data_points]
lum_black = [obj['lum'] for obj in black_data_points]
rating_black = [obj['rating'] for obj in black_data_points]

hue_white = [obj['hue'] for obj in white_data_points]
sat_white = [obj['sat'] for obj in white_data_points]
lum_white = [obj['lum'] for obj in white_data_points]
rating_white = [obj['rating'] for obj in white_data_points]


fig = make_subplots(rows=1, cols=2,
                    specs=[[{"type": "scene"}, {"type": "scene"}]],
                    subplot_titles=("Black Text", "White Text"),
                    horizontal_spacing=0.01)

marker_size = 3

black_fig = go.Scatter3d(x=hue_black, y=sat_black, z=lum_black, mode='markers',
                         marker=dict(size=marker_size, color=rating_black,colorscale='Magma',))

white_fig = go.Scatter3d(x=hue_white, y=sat_white, z=lum_white, mode='markers',
                         marker=dict(size=marker_size, color=rating_white,colorscale='Magma',
                         showscale=True, colorbar={"thickness": 15, "len": 0.5, "x": 1, "y": 0.6, }))

fig.add_trace(black_fig,row=1,col=1)
fig.add_trace(white_fig,row=1,col=2)

fig.update_layout(scene={'xaxis_title':'Hue','yaxis_title':'Saturation', 'zaxis_title':'Luminance'}, showlegend=False)
fig.update_layout(scene2={'xaxis_title':'Hue','yaxis_title':'Saturation', 'zaxis_title':'Luminance'}, showlegend=False)

fig.show()
cursor.close()
connection.close()

