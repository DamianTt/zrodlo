import React, { Component } from 'react';
import './App.scss';
import GraphNotMyWayV5 from './graph/GraphNotMyWayV5';
import ForceCollide from './graph/ForceCollide';
import ForceCollide2 from './graph/ForceCollide2';
import ForceLinks from './graph/ForceLinks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="graph-container">
            <GraphNotMyWayV5 />
            <ForceCollide />
            <ForceCollide2 />
            <ForceLinks />
          </div>
        </header>
      </div >
    );
  }
}

export default App;
