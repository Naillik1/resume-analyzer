import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form.js';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart.js';

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
    });
  }

  render() {
    console.log(this.state.watson);
    const barChart = this.state.watson.keywords ? (
        <Chart data={this.state.watson.keywords} /> 
        ) : null;
    return (
        <MuiThemeProvider>
          <div className='App'>
            <header className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <h1 className='App-title'>Resume Analyzer</h1>
            </header>
            <Form onSubmit={this.analyzeText} />
            { barChart }
          </div>
        </MuiThemeProvider>
        );
  }

}
export default App;
