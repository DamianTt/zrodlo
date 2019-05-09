import React, { Component } from 'react';
import * as d3 from 'd3';
import './GraphNotMyWayV5.scss';

class GraphNotMyWayV5 extends Component {
    componentDidMount() {
        var width = 300, height = 300;
        var numNodes = 30;

        this.nodeArray = [];
        this.linkArray = [];

        for (let i = 0; i < numNodes; i++) {
            this.nodeArray.push(
                {
                    radius: Math.random() * 25,
                    fx: i * 7,
                    fy: i % 2 === 0 ? 50 : 100
                }
            );
            this.linkArray.push(
                { source: i, target: i !== numNodes - 1 ? i + 1 : 0 }
            )
        }
        // this.nodes = d3.range(numNodes).map(function (d) {
        //     return { radius: Math.random() * 25 }
        // })

        var simulation = d3.forceSimulation(this.nodeArray)
            .force('charge', d3.forceManyBody().strength(5)) // makes the elements repel each other. .strength(-20) positive value will cause elements to attract one another while a negative value causes elements to repel The default value is -30
            .force('center', d3.forceCenter(width / 2, height / 2)) // attracts the elements towards a centre point
            .force('collision', d3.forceCollide().radius(function (d) {
                return d.radius
            }))
            .force('link', d3.forceLink().links(this.linkArray))
            .on('tick', this.ticked); // Each time the simulation iterates the function ticked will be called.
    }

    ticked = () => {
        var u = d3.select('#nmw-nodes')
            .selectAll('circle')
            .data(this.nodeArray)

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

        u.exit().remove();

        var v = d3.select('#nmw-links')
            .selectAll('line')
            .data(this.linkArray)

        v.enter()
            .append('line')
            .merge(v)
            .attr('x1', function (d) {
                return d.source.x
            })
            .attr('y1', function (d) {
                return d.source.y
            })
            .attr('x2', function (d) {
                return d.target.x
            })
            .attr('y2', function (d) {
                return d.target.y
            })

        v.exit().remove()
    }

    render() {
        return (
            <div id="content">
                <svg width="300" height="300">
                    <g id="nmw-links"></g>
                    <g id="nmw-nodes"></g>
                </svg>
            </div>
        );
    }
}

export default GraphNotMyWayV5;