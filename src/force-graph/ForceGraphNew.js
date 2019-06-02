import React, { Component } from 'react';
import * as d3 from 'd3';
import './ForceGraph.scss';

class ForceGraphNew extends Component {
    constructor(props) {
        super(props);
        this.width = 1080;
        this.height = 540;
        this.radius = 50;
    }

    componentDidMount() {

        var numNodes = 30;

        this.nodeArray = [];
        this.linkArray = [];

        for (let i = 0; i < numNodes; i++) {
            this.nodeArray.push(
                {
                    radius: this.radius,
                    //fx: i * 7,
                    //fy: i % 2 === 0 ? 50 : 100
                }
            );
            this.linkArray.push(
                { source: i, target: i !== numNodes - 1 ? i + 1 : 0 }
            )
        }

        this.simulation = d3.forceSimulation(this.nodeArray)
            .force('charge', d3.forceManyBody().strength(-1 * 10 * this.radius)) // makes the elements repel each other. .strength(-20) positive value will cause elements to attract one another while a negative value causes elements to repel The default value is -30
            .force('center', d3.forceCenter(this.width / 2, this.height / 2)) // attracts the elements towards a centre point
            .force('collision', d3.forceCollide().radius(function (d) {
                return d.radius
            }))
            .force('link', d3.forceLink().links(this.linkArray))
            .on('tick', this.ticked); // Each time the simulation iterates the function ticked will be called.

        var u = d3.select(this.nodesElement)
            .selectAll('.node')
            .data(this.nodeArray)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', this.radius)
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended)
            );
        u.exit().remove();

        var v = d3.select(this.linksElement)
            .selectAll('.line')
            .data(this.linkArray)
            .enter()
            .append('line')
            .attr('class', 'line')
        v.exit().remove()

        //add zoom capabilities 
        d3.select(this.svgElement).call(d3.zoom().on("zoom", this.zoomed));
    }

    ticked = () => {
        d3.select(this.nodesElement)
            .selectAll('.node').attr('cx', function (d) {
                return d.x
            })
            .attr('cy', function (d) {
                return d.y
            });

        d3.select(this.linksElement)
            .selectAll('.line').attr('x1', function (d) {
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
    }

    dragstarted = (d) => {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended = (d) => {
        if (!d3.event.active) this.simulation.alphaTarget(0);
    }

    zoomed = () => {
        d3.select(this.zoomWrapperElement).attr("transform", d3.event.transform)
    }

    render() {
        return (
            <div id="content">
                <svg width={this.width} height={this.height} ref={(el) => { this.svgElement = el; }}>
                    <g className="zoom-wrapper" ref={(el) => { this.zoomWrapperElement = el; }}>
                        <g ref={(el) => { this.linksElement = el; }}></g>
                        <g ref={(el) => { this.nodesElement = el; }}></g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default ForceGraphNew;