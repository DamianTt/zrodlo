import React, { Component } from 'react';
import * as d3 from 'd3';

class ForceCollide2 extends Component {
    componentDidMount() {
        var width = 600, height = 400;

        this.colorScale = ['orange', 'lightblue', '#B19CD9'];
        var xCenter = [100, 300, 500]

        var numNodes = 100;
        this.nodes = d3.range(numNodes).map(function (d, i) {
            return {
                radius: Math.random() * 25,
                category: i % 3
            }
        });

        var simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(5))
            .force('x', d3.forceX().x(function (d) {
                return xCenter[d.category];
            }))
            .force('collision', d3.forceCollide().radius(function (d) {
                return d.radius;
            }))
            .on('tick', this.ticked);

    }

    ticked = () => {
        var u = d3.select('#force-collide-2-component svg g')
            .selectAll('circle')
            .data(this.nodes);

        u.enter()
            .append('circle')
            .attr('r', function (d) {
                return d.radius;
            })
            .style('fill', (d) => {
                return this.colorScale[d.category];
            })
            .merge(u)
            .attr('cx', function (d) {
                return d.x;
            })
            .attr('cy', function (d) {
                return d.y;
            })

        u.exit().remove();
    }

    render() {
        return (
            <div id="force-collide-2-component">
                <svg width="700" height="400">
                    <g transform="translate(50, 200)"></g>
                </svg>
            </div>
        );
    }
}

export default ForceCollide2;