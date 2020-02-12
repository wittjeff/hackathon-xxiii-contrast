import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import Button from "react-bootstrap/Button";

class SliderTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sliderVal: 0,
      mainColor: 'rgb(0,0,0)',
    };
    this.setColorState = this.setColorState.bind(this);

  }

  setColorState()  {
    console.log('in set color state');
    console.log(this);
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const bgColor = "rgb(" + x + "," + y + "," + z + ")";
    this.setState({mainColor: bgColor})
  }

  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;

    const colorFromValue = (value) => {
      if (value <= 9) {
        return `#${value}${value}${value}`
      } else if (value === 10) {
        return `#AAAAAA`
      } else if (value === 11) {
        return `#BBBBBB`
      } else if (value === 12) {
        return `#CCCCCC`
      } else if (value === 13) {
        return `#DDDDDD`
      } else if (value === 14) {
        return `#EEEEEE`
      } else if (value === 15) {
        return `#FFFFFF`
      }
      return `#000000`
    };




    const handle = (props) => {
      const {
        value,
        dragging,
        index,
        ...restProps
      } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };
    const grayStyle = {
      height: '40px',
      width: '40px',
      color: colorFromValue(this.state.sliderVal)
    }

    const mainStyle = {
      color: this.state.mainColor,
    }

    return (
      <React.Fragment>
        <div style={mainStyle}>
          WORD
        </div>
        <Slider min={0} max={16} defaultValue={0} handle={handle}
        onChange={val => this.setState({ sliderVal: val })}/>
      <div style={grayStyle}>
      WORD
      </div>
      <Button onClick={this.setColorState}>
      submit
      </Button>
      </React.Fragment>

    )
  }
}

export default SliderTest;
