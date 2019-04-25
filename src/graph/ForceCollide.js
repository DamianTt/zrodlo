import React, { Component } from 'react';
import * as d3 from 'd3';

class ForceCollide extends Component {
    componentDidMount() {
        var width = 400, height = 400

        var numNodes = 100
        this.nodes = d3.range(numNodes).map(function (d) {
            return { radius: Math.random() * 25 }
        })

        var simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(5))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(function (d) {
                return d.radius
            }))
            .on('tick', this.ticked);
    }

    ticked = () => {
        var u = d3.select('#force-collide-component svg')
            .selectAll('circle')
            .data(this.nodes)

        u.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.radius
            })
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
            <div id="force-collide-component">
                <svg width="300" height="300">
                </svg>
            </div>
        );
    }
}

export default ForceCollide;