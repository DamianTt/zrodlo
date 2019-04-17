import React, { Component } from 'react';
import './App.css';
import GraphNotMyWay from './graph/GraphNotMyWay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GraphNotMyWay />
        </header>
      </div >
    );
  }
}

export default App;
