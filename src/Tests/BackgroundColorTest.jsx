import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSmile,
  faGrinBeam,
  faMeh,
  faAngry,
  faFrown,
} from '@fortawesome/free-solid-svg-icons'
import { LoremIpsum } from 'lorem-ipsum';


class BackgroundColorTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: undefined,
    };
    this.submitFeedback = this.submitFeedback.bind(this);
  }

  submitFeedback(value) {
    const { background, foreground } = this.props;

    this.props.onSubmit({
      userRating: value,
      backgroundColor: background,
      foregroundColor: foreground,
      testModule: 'BackgroundColorTest',
    });
  }

  getRandomWords() {
    const lorem = new LoremIpsum({
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    return lorem.generateSentences(1);
  }

  render() {
    const { background, foreground } = this.props;

    return (
      <React.Fragment>
        <h2 className="h2" labelFor="test-body">How legible is the following text?</h2>
        <div className="d-flex test-module">
          <div
            className="sample w-50 border d-flex align-items-center justify-content-center"
            id="test-body"
            style={{backgroundColor: background}}
          >
            <div
              className="test-text font-weight-normal p-4"
              style={{color: foreground}}
            >{this.getRandomWords()}
            </div>
          </div>

          <table className="table table-borderless m-0">
            <tbody>                
              <tr>
                <td className="px-2 pb-2 pt-0 w-50">
                  <div className="d-flex">
                    <button
                      className="btn btn-dark mb-2 text-left d-flex align-items-center w-100"
                      onClick={() => this.submitFeedback(5) }
                    >
                      <FontAwesomeIcon icon={faGrinBeam} size="3x" />
                      <div className="btn-label ml-4">Strong</div>
                    </button>
                    
                  </div>
                </td>
                <td className="p-0 pt-1"><div className="description">Very easily legible.</div></td>
              </tr>
              <tr>
                <td className="p-2">
                  <div className="d-flex">
                    <button
                      className="btn btn-dark mb-2 text-left d-flex align-items-center w-100"
                      onClick={() => this.submitFeedback(4) }
                    >
                      <FontAwesomeIcon icon={faSmile} size="3x" />
                      <div className="btn-label ml-4">Comfortable</div>
                    </button>
                  </div>
                </td>
                <td className="p-0 pt-1"><div className="description">You could read this quite easily, with no real slow-down.</div></td>
              </tr>
              <tr>            
                <td className="p-2">
                  <div className="d-flex">
                    <button
                      className="btn btn-dark mb-2 text-left d-flex align-items-center w-100"
                      onClick={() => this.submitFeedback(3) }
                    >
                      <FontAwesomeIcon icon={faMeh} size="3x" />
                      <div className="btn-label ml-4">Readable with effort</div>
                    </button>
                  </div>
                </td>
                <td className="p-0 pt-1"><div className="description">The additional effort may be subtle. Note that this slow-down is sometimes intended in everyday designs to de-emphasize secondary text.</div></td>
              </tr>
              <tr>
                <td className="p-2">
                  <div className="d-flex">
                    <button
                      className="btn btn-dark mb-2 text-left d-flex align-items-center w-100"
                      onClick={() => this.submitFeedback(2) }
                    >
                      <FontAwesomeIcon icon={faFrown} size="3x" />
                      <div className="btn-label ml-4">Too much effort</div>
                    </button>
                  </div>
                </td>
                <td className="p-0 pt-1"><div className="description">You feel you shouldn’t have to work this hard to read anything. De-emphasis gone too far.</div></td>
              </tr>
              <tr>
                <td className="px-2 pt-2 pb-0">
                  <div className="d-flex">
                    <button
                      className="btn btn-dark text-left d-flex align-items-center w-100"
                      onClick={() => this.submitFeedback(1) }
                    >
                      <FontAwesomeIcon icon={faAngry} size="3x" />
                      <div className="btn-label ml-4">Illegible</div>
                    </button>
                  </div>
                </td>
                <td className="p-0 pt-1"><div className="description">Really can’t read it at all, or fear you might not get parts of it.</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default BackgroundColorTest;
