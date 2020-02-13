import plotly.express as px
import pandas as pd
import random

def random_point():
    return {'hue': random.random(), 'sat': random.random(), 'lum': random.random(), 'opinion': random.randint(1, 5)}

fake_data = [random_point() for _ in range(50)]

df = pd.DataFrame(fake_data)
fig = px.scatter_3d(df, x='hue', y='sat', z='lum',
                    color='opinion')
fig.show()
