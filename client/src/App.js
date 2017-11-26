import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as d3 from 'd3';
import {withFauxDOM} from 'react-faux-dom';
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
    const keywords = this.state.watson.keywords;
    const rendered = keywords ? keywords.map( (keyword, i) => {
      return (
          <div>
            {keyword.text}, {keyword.relevance}
          </div>
          );
    }) : null;
    return (
        <MuiThemeProvider>
          <div className='App'>
            <header className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <h1 className='App-title'>Resume Analyzer</h1>
            </header>
            <Form onSubmit={this.analyzeText} />
            { keywords ? (<Chart keywords={keywords} />) : null}
          </div>
        </MuiThemeProvider>
        );
  }

}
export default App;
