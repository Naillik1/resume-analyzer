import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form.js';
import logo from './logo.svg';
import './App.css';

const dummy = "This is a tiny bunch of demo text to throw to the example component.";

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <Form />
          </div>
        </MuiThemeProvider>
        );
  }
}

export default App;
