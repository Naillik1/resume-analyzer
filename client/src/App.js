import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const dummy = "This is a tiny bunch of demo text to throw to the example component.";

class App extends Component {
  state = { watson: [] }

  componentDidMount() {
    this.analyzeText();
  }

  analyzeText = () => {
    const data = {data: dummy};
    console.log(JSON.stringify(data).length);
    console.log(data);
    fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
      .then(watson => {
        console.log(watson);
        this.setState({ watson });
      });
  }

  render() {
    const {watson} = this.state;
    console.log(watson);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            {watson.language}
          </p>
        </div>
        );
  }
}

export default App;
