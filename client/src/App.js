import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form.js';
import Chart from './Chart.js';
import './App.css';

class App extends Component {
  state = { 
    analysis: [],
    errors: {}
  };

  analyzeText = (event) => {
    event.preventDefault();
    const payload = { data: document.forms.toAnalyze.text.value };
    fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
      .then(res => {
        if (res.errors) {
          this.setState({ errors: res.errors })
        } else {
          this.setState({ analysis: res, errors: {} });
        }
    });
  }

  render() {
    const margin = { top: 30, right: 20, bottom: 30, left: 150 };
    const width = 960 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    let summary = this.state.analysis.summary;
    let keywords = this.state.analysis.keywords;
    console.log(summary);
    console.log(keywords);
    if (keywords) {
      keywords = keywords.map( (elem) => {
      elem['key'] = `${elem.text}${elem.relevance}`
      return elem;
      });
    }
    const barChart = keywords ? (
        <Chart data={keywords} margin={margin} width={width} height={height}/> 
        ) : null;
    return (
        <MuiThemeProvider>
          <div className='App'>
            <header className='App-header'>
              <h1 className='App-title'>Resume Analyzer</h1>
              <h3> Enter a block of text to get a summary and chart of its most important keywords :) </h3>
            </header>
            <Form onSubmit={this.analyzeText} errors={this.state.errors} />
            <br />
            <div className='formContainer'>Summary</div>
            <div className='formContainer'>{ summary }</div>
            { barChart }
          </div>
        </MuiThemeProvider>
        );
  }

}
export default App;
