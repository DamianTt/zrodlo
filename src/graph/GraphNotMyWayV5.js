import React, { Component } from 'react';
import * as d3 from 'd3';
import './GraphNotMyWayV5.scss';

class GraphNotMyWayV5 extends Component {
    componentDidMount() {
        var width = 300, height = 300;
        var numNodes = 100
        this.nodes = d3.range(numNodes).map(function(d) {
            return {radius: Math.random() * 25}
        })

        var simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(5)) // makes the elements repel each other. .strength(-20) positive value will cause elements to attract one another while a negative value causes elements to repel The default value is -30
            .force('center', d3.forceCenter(width / 2, height / 2)) // attracts the elements towards a centre point
            .force('collision', d3.forceCollide().radius(function(d) {
                return d.radius
              }))
            .on('tick', this.ticked); // Each time the simulation iterates the function ticked will be called.
    }

    ticked = () => {
        var u = d3.select('svg')
            .selectAll('circle')
            .data(this.nodes)

        u.enter()
            .append('circle')
            .attr('r', 5)
            .merge(u)
            .attr('cx', function (d) {
                return d.x
            })
            .attr('cy', function (d) {
                return d.y
            })

        u.exit().remove()
    }

    render() {
        return (
            <div id="content">
                <svg width="300" height="300">
                </svg>
            </div>
        );
    }
}

export default GraphNotMyWayV5;