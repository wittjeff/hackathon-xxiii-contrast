import React from 'react';

import { Helmet } from 'react-helmet';
import { SHA3 } from 'sha3';
import axios from 'axios';

import BackgroundColorTest from './Tests/BackgroundColorTest';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      currentTest: 0,
      totalColors: 50,
      totalTests: 0,
      colorMap: [],
    };
    this.setUser = this.setUser.bind(this);
    this.handleTestSubmission = this.handleTestSubmission.bind(this);
    this.hexToRgb = this.hexToRgb.bind(this);
    this.version = 0
    this.emailInput = React.createRef();
    this.testCounter = React.createRef();
  }

  componentDidMount() {
    this.getColorMap();
  }

  getRandomColor() {
    // The available hex options
    let hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const color = ['#'];

    // Create a six-digit hex color
    for (let i = 0; i < 6; i++) {
      let shuffledArray = this.shuffleArray(hex);
      color.push(shuffledArray[0]);
    }

    // Return the color string
    return color.join('');
  }

  getColorMap() {
    const { totalColors } = this.state;
    const map = new Array(totalColors).fill('something');

    const colors = map.reduce(accumulator => {
      const color = this.getRandomColor();
      accumulator.push(
        { background: color, foreground: 'white' },
        { background: color, foreground: 'black' },
      );

      return accumulator;
    }, []);

    this.setState({
      colorMap: this.shuffleArray(colors),
      totalTests: totalColors * 2,
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  setUser(event) {
    event.preventDefault();
    const email = this.emailInput.current.value;
    const hash = new SHA3(224).update(email).digest('hex');

    this.setState({
      user: hash,
      currentTest: 1,
    });
  }

  //thank you StackOverflow
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  handleTestSubmission(value) {
    const {
      backgroundColor,
      foregroundColor,
      testModule,
      userRating
    } = value;
    const {
      r: backgroundRed,
      g: backgroundGreen,
      b: backgroundBlue,
    } = this.hexToRgb(backgroundColor);
    const {
      r: foregroundRed,
      g: foregroundGreen,
      b: foregroundBlue,
    } = this.hexToRgb( foregroundColor === 'black' ? '#000000' : '#FFFFFF')

    const dbUrl = "https://hackathon-xxiii-contrast-back.herokuapp.com/api";
    axios.post(dbUrl, {
      user: this.state.user,
      test: this.state.currentTest,
      testModule,
      backgroundRed,
      backgroundGreen,
      backgroundBlue,
      foregroundRed,
      foregroundGreen,
      foregroundBlue,
      userRating,
      versionHash: new SHA3(224).update(`version_${this.version}`).digest('hex'),
    }).then((response) => console.log(response));

 /* console.log({
    user: this.state.user,
    test: this.state.currentTest,
    testModule,
    backgroundRed,
    backgroundGreen,
    backgroundBlue,
    foregroundRed,
    foregroundGreen,
    foregroundBlue,
    userRating,
    versionHash: new SHA3(224).update(`version_${this.version}`).digest('hex')
  ,
  });*/

    this.setState({
      currentTest: this.state.currentTest + 1,
    });

    this.testCounter.current.focus();
  }

  getEmailCollectionForm() {
    return (
      <React.Fragment>
        <div className="mb-4">
          <form className="form-inline" onSubmit={this.setUser}>
            <div className="form-group d-flex w-100">
              <label htmlFor="user-email" className="mr-4">Email address</label>
              <input
                type="email"
                className="form-control w-50"
                id="user-email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                ref={this.emailInput}
              />
              <button type="submit" className="btn btn-primary ml-4">Submit</button>
            </div>
          </form>
          <small id="emailHelp" className="form-text text-muted">We use your email address as a unique identifier, but we don’t store it in plain text. We will never share your email with anyone else.</small>
        </div>
        <div>
          <p>For this set of tasks, we are asking you to rate the relative ease of reading a single phrase. Only the text foreground and background colors change.</p>
          <p>In the future we may include different fonts, weights, sizes, and text samples, which could affect subjective contrast ratings considerably. But in this experiment please just rate the text sample with the size and colors shown here.</p>
        </div>
      </React.Fragment>
    );
  }

  getTest(number) {
    const { colorMap } = this.state;

    if (number > this.state.totalTests) {    
      return (
        <h2>Test completed, thank you.</h2>
      );
    }

    const colorChoice = colorMap[number -1];
    const SelectedTest = BackgroundColorTest;

    return (
      <SelectedTest
        {...colorChoice}
        onSubmit={this.handleTestSubmission}
      />
    );
  }

  getTitle() {
    const {
      currentTest,
      totalTests,
    } = this.state;

    if (currentTest === 0) {
      return 'landing page';
    } else if (currentTest > totalTests) {
      return 'test completed';
    }

    return `test ${currentTest}`; 
  }

  render() {
    const {
      user,
      currentTest,
      totalTests,
    } = this.state;
    const testIsRunning = currentTest > 0 && currentTest <= totalTests;

    // TODO: better focus management for inital test load
    if (currentTest === 1) {
      setTimeout(() =>
        this.testCounter.current.focus(), 1000);
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Hackathon XXIII: Contrast Study | ${this.getTitle()}`}</title>
        </Helmet>
        <div className="app">
          <header className="app-header">
            <div className="container">
              <h1>Color contrast feedback</h1>
              <p>We’re attempting to model perceived color contrast, particular as it affects text legibility. There are a number of possible ways to approach this, and this set of tasks is only one of several test methodologies that is being considered.</p>
            </div>
          </header>
        </div>
        <div className="container my-4" aria-live="polite">
          {!user && this.getEmailCollectionForm()}
          {testIsRunning &&
            <h2
              className="h2 d-inline-block"
              tabIndex="-1"
              ref={this.testCounter}
            >{`${currentTest}/${totalTests}`}
            </h2>
          }
          {user && this.getTest(currentTest)}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
