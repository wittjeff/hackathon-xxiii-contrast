import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSmile,
  faGrinBeam,
  faMeh,
  faAngry,
  faFrown,
} from '@fortawesome/free-solid-svg-icons'

class BackgroundColorTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: undefined,
    };
    this.submitFeedback = this.submitFeedback.bind(this);
  }

  submitFeedback(value) {
    console.log(`selected ${value}`);
    this.props.onSubmit(value);
  }

  render() {
    const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

    return (
      <React.Fragment>
        <div className="d-flex">
          <div
            className="sample w-50 border d-flex align-items-center justify-content-center"
            style={{backgroundColor: randomColor}}
          >
            <div className="">Words</div>
          </div>

          <div className="d-flex flex-column pl-4">
            <button
              className="btn btn-primary mb-2 text-left d-flex align-items-center"
              onClick={() => this.submitFeedback(5) }
            >
              <FontAwesomeIcon icon={faGrinBeam} size="3x" />
              <div className="btn-label ml-4">Strong</div>
            </button>
            <button
              className="btn btn-primary mb-2 text-left d-flex align-items-center"
              onClick={() => this.submitFeedback(4) }
            >
              <FontAwesomeIcon icon={faSmile} size="3x" />
              <div className="btn-label ml-4">Comfortable</div>
            </button>
            <button
              className="btn btn-primary mb-2 text-left d-flex align-items-center"
              onClick={() => this.submitFeedback(3) }
            >
              <FontAwesomeIcon icon={faMeh} size="3x" />
              <div className="btn-label ml-4">Readable with effort</div>
            </button>
            <button
              className="btn btn-primary mb-2 text-left d-flex align-items-center"
              onClick={() => this.submitFeedback(2) }
            >
              <FontAwesomeIcon icon={faFrown} size="3x" />
              <div className="btn-label ml-4">Too much effort</div>
            </button>
            <button
              className="btn btn-primary mb-2 text-left d-flex align-items-center"
              onClick={() => this.submitFeedback(1) }
            >
              <FontAwesomeIcon icon={faAngry} size="3x" />
              <div className="btn-label ml-4">Illegible</div>
            </button>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default BackgroundColorTest;