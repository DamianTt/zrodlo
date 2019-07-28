import React, { Component } from 'react';
import * as d3 from 'd3';
import './ForceGraph.scss';

class ForceGraphNew extends Component {
    constructor(props) {
        super(props);
        this.width = 1080;
        this.height = 540;
        this.radius = 100;
        this.padding = 16;
        this.titleFontSize = 12;
    }

    componentDidMount() {
        const { data } = this.props;

        this.nodeArray = [];
        this.linkArray = [];

        data.forEach(node => {
            this.nodeArray.push(
                {
                    id: node.id,
                    title: node.title
                }
            );
            if (node.parent) {
                this.linkArray.push(
                    { source: node.id, target: node.parent }
                )
            }
        });

        this.simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(-1 * 10 * this.radius)) // makes the elements repel each other. .strength(-20) positive value will cause elements to attract one another while a negative value causes elements to repel The default value is -30
            .force('center', d3.forceCenter(this.width / 2, this.height / 2)) // attracts the elements towards a centre point
            .force('collision', d3.forceCollide(this.radius + this.padding))
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .on('tick', this.ticked); // Each time the simulation iterates the function ticked will be called.

        this.simulation.nodes(this.nodeArray);
        this.simulation.force("link").links(this.linkArray);

        var d3nodesElement = d3.select(this.nodesElement)
            .selectAll('.node-container')
            .data(this.nodeArray)
            .enter()
            .append('g')
            .attr('class', 'node-container')
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended)
            );
        d3nodesElement.exit().remove();

        d3nodesElement.append('rect')
            .attr('class', 'node-box')
            .attr('width', this.radius * 2)
            .attr('height', this.radius)
            .attr('rx', 15)

        d3nodesElement.append('text')
            .attr('class', 'node-title')
            .attr('dy', this.titleFontSize + 8)
            .attr('dx', 8)
            .attr('font-size', this.titleFontSize)
            .text(function(d) { return d.title; });


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
            .selectAll('.node-container').attr('transform', (d) => {
                return `translate(${d.x - this.radius},${d.y - this.radius / 2})`
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