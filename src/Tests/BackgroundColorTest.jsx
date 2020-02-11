import React from 'react';

class BackgroundColorTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: undefined,
    };
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <h1>{`BackgroundColorTest for ${user}`}</h1>
        <button>Black</button>
        <button>White</button>
      </React.Fragment>
    );
  }
}

export default BackgroundColorTest;
