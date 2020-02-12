import React from 'react';

import { Helmet } from 'react-helmet';
import { SHA3 } from 'sha3';

import BackgroundColorTest from './Tests/BackgroundColorTest';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      currentTest: 0,
      totalTests: 10,
    };
    this.setUser = this.setUser.bind(this);
    this.handleTestSubmission = this.handleTestSubmission.bind(this);
    this.emailInput = React.createRef();
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

  handleTestSubmission(value) {
    console.log(`handleTestSubmission: ${value}`);
    this.setState({
      currentTest: this.state.currentTest + 1,
    })
  }

  getEmailCollectionForm() {
    return (
      <div>
        <form onSubmit={this.setUser}>
          <div className="form-group d-flex">
            <label htmlFor="user-email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="user-email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              ref={this.emailInput}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </form>
      </div>
    );
  }

  getTest(number) {
    if (number > this.state.totalTests) {    
      return (
        <h2>Test completed</h2>
      );
    }

    return (
      <BackgroundColorTest
        onSubmit={this.handleTestSubmission}
      />
    );
  }

  render() {
    const {
      user,
      currentTest,
      totalTests,
    } = this.state;
    const pageType = user ? 'landing page' : 'test';

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Hackathon XXIII: Contrast Study | ${pageType}`}</title>
        </Helmet>
        <div className="app">
          <header className="app-header">
            <div className="container">
              <h1>Make the world better</h1>
              <p>Words about what this site is and why people should invest their time to help improve the world.</p>
            </div>
          </header>
        </div>
        <div className="container" aria-live="polite">
          {!user && this.getEmailCollectionForm()}
          {currentTest > 0 && currentTest <= totalTests &&
              <h2 className="h2">{`${currentTest}/${totalTests}`}</h2>
          }
          {user && this.getTest(currentTest)}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
