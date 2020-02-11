import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser() {
    const email = document.getElementById('user-email').value;

    this.setState({
      user: email,
    });
  }

  getEmailCollectionForm() {
    return (
      <div>
        <form onSubmit={this.setUser}>
          <div className="form-group">
            <label htmlFor="user-email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="user-email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Make the world better</h1>
          </header>
        </div>
        {!user && this.getEmailCollectionForm()}
        {user && `${user} is helping save the world`}
      </React.Fragment>
    );
  }
}

export default App;
