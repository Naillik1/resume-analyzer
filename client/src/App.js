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
    let keywords = (this.state.watson.keywords)
    if (keywords){
      keywords = keywords.map( (elem) => {
      elem['key'] = `${elem.text}${elem.relevance}`
      return elem;
      });
    }
    const barChart = keywords ? (
        <Chart data={keywords} /> 
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
