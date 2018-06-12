import React, { Component } from 'react';
import logo from './logo.svg';
import Inputform from './components/input-form';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Inputform / >
      </div>
    );
  }
}

export default App;
