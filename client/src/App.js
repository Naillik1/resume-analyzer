import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { watson: [] };

  analyzeText = (event) => {
    event.preventDefault();
    const payload = { data: document.forms.toAnalyze.resume.value };
    fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(watson => {
      this.setState({ watson });
      console.log(watson);
    });
  }

  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Resume Analyzer</h1>
            </header>
            <Form onSubmit={this.analyzeText} />
          </div>
        </MuiThemeProvider>
        );
  }
}

export default App;
