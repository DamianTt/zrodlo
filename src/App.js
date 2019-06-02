import React, { Component } from 'react';
import './App.scss';
import ForceGraphNew from './force-graph/ForceGraphNew';
// import GraphNotMyWayV5 from './graph-playground/GraphNotMyWayV5';
// import ForceCollide from './graph-playground/ForceCollide';
// import ForceCollide2 from './graph-playground/ForceCollide2';
// import ForceLinks from './graph-playground/ForceLinks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="graph-container">
            <ForceGraphNew />
            {/* <GraphNotMyWayV5 />
            <ForceCollide />
            <ForceCollide2 />
            <ForceLinks /> */}
          </div>
        </header>
      </div >
    );
  }
}

export default App;
