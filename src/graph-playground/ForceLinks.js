import React, { Component } from 'react';
import * as d3 from 'd3';
import './ForceLinks.scss';

class ForceLinks extends Component {
    componentDidMount() {
        var width = 400, height = 300

        this.nodes = [
            { name: 'A' },
            { name: 'B' },
            { name: 'C' },
            { name: 'D' },
            { name: 'E' },
            { name: 'F' },
            { name: 'G' },
            { name: 'H' },
        ]

        this.links = [
            { source: 0, target: 1 },
            { source: 0, target: 2 },
            { source: 0, target: 3 },
            { source: 1, target: 6 },
            { source: 3, target: 4 },
            { source: 3, target: 7 },
            { source: 4, target: 5 },
            { source: 4, target: 7 }
        ]

        var simulation = d3.forceSimulation(this.nodes)
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(this.links))
            .on('tick', this.ticked);

    }

    updateLinks = () => {
        this.u = d3.select('.links')
            .selectAll('line')
            .data(this.links)

        this.u.enter()
            .append('line')
            .merge(this.u)
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

        this.u.exit().remove()
    }

    updateNodes = () => {
        this.u = d3.select('.nodes')
            .selectAll('text')
            .data(this.nodes)

        this.u.enter()
            .append('text')
            .text(function (d) {
                return d.name
            })
            .merge(this.u)
            .attr('x', function (d) {
                return d.x
            })
            .attr('y', function (d) {
                return d.y
            })
            .attr('dy', function (d) {
                return 5
            })

        this.u.exit().remove()
    }


    ticked = () => {
        this.updateLinks();
        this.updateNodes();
    }

    render() {
        return (
            <div id="content">
                <svg width="400" height="300">
                    <g className="links"></g>
                    <g className="nodes"></g>
                </svg>
            </div>
        );
    }
}

export default ForceLinks;