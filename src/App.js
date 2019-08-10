import React, { Component } from 'react';
import './App.scss';
import ForceGraphNew from './force-graph/ForceGraphNew';
// import GraphNotMyWayV5 from './graph-playground/GraphNotMyWayV5';
// import ForceCollide from './graph-playground/ForceCollide';
// import ForceCollide2 from './graph-playground/ForceCollide2';
// import ForceLinks from './graph-playground/ForceLinks';

const data = [
  {
    id: 1,
    parent: null,
    title: "Mój główny node"
  },
  {
    id: 2,
    parent: 1,
    title: "Mój pod1-główny node"
  },
  {
    id: 20,
    parent: 1,
    title: "Mój pod2-główny node"
  },
  {
    id: 4,
    parent: 20,
    title: "Mój pod1-pod2-główny node"
  },
  {
    id: 5,
    parent: 20,
    title: "Mój pod2-pod2-główny node"
  },
  {
    id: 6,
    parent: 5,
    title: "Mój pod1-pod2-pod2-główny node"
  },
  {
    id: 7,
    parent: 5,
    title: "Mój pod2-pod2-pod2-główny node"
  },
  {
    id: 8,
    parent: 5,
    title: "Mój pod3-pod2-pod2-główny node"
  },
  {
    id: 9,
    parent: 5,
    title: "Mój pod4-pod2-pod2-główny node"
  },
  {
    id: 10,
    parent: 5,
    title: "Mój pod5-pod2-pod2-główny node"
  },
  {
    id: 11,
    parent: 5,
    title: "Mój pod6-pod2-pod2-główny node"
  },
  {
    id: 12,
    title: "Node bez parenta"
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="graph-container">
            <ForceGraphNew data={data} />
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
