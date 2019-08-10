import React, { Component } from 'react';
import * as d3 from 'd3';
import './ForceGraph.scss';

class ForceGraphNew extends Component {

    nodeArray = [];
    linkArray = [];

    constructor(props) {
        super(props);
        this.width = 1440;
        this.height = 900;
        this.radius = 100;
        this.padding = 16;
        this.titleFontSize = 12;
    }

    componentDidMount() {
        const { data } = this.props;

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

        //add zoom capabilities 
        d3.select(this.svgElement).call(d3.zoom().on("zoom", this.zoomed));

        this.update();
    }

    update = () => {
        var d3nodesElement = d3.select(this.nodesElement)
            .selectAll('.node-container')
            .data(this.nodeArray)

        d3nodesElement.exit().remove();

        d3nodesElement = d3nodesElement.enter()
            .append('g')
            .attr('class', 'node-container')
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended)
            )
            .merge(d3nodesElement); // merge wykonuje się, aby wykonać dla nowych elementów .data(this.nodeArray)

        // ## Node component - how to make it independent?
        const nodeWidth = this.radius * 2;
        const nodeHeight = this.radius * 0.7;
        d3nodesElement.append('rect')
            .attr('class', 'node-box')
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('rx', 15)

        d3nodesElement.append('text')
            .attr('class', 'node-title')
            .attr('dy', this.titleFontSize + 8)
            .attr('dx', 8)
            .attr('font-size', this.titleFontSize)
            .text(function (d) { return d.title; });

        d3nodesElement.append('svg')
            .attr('class', 'add-node')
            .attr('pointer-events', 'bounding-box')
            .attr('viewBox', '0 0 24 24')
            .attr('width', 24)
            .attr('height', 24)
            .attr('x', nodeWidth - 32)
            .attr('y', nodeHeight - 32)
            .on('mousedown', () => d3.event.stopPropagation())
            .on('dblclick', () => d3.event.stopPropagation())
            .on('click', (d) => {
                d3.event.stopPropagation();
                this.addChildNode(d.id);
            })
            .append('path')
            .attr('d', 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z');
        // ##

        var d3linksElement = d3.select(this.linksElement)
            .selectAll('.line')
            .data(this.linkArray)

        d3linksElement.exit().remove();

        d3linksElement = d3linksElement.enter()
            .append('line')
            .attr('class', 'line')
            .merge(d3linksElement);

        // Update and restart the simulation.
        this.simulation.nodes(this.nodeArray);
        this.simulation.force("link").links(this.linkArray);
        this.simulation.alpha(0.1).restart();
    }

    addChildNode = (parentId) => {
        const newId = Math.ceil(Math.random() * (9999 - 100) + 100);
        this.nodeArray.push({
            id: newId,
            title: "Nowy node"
        });

        this.linkArray.push(
            { source: parentId, target: newId }
        )

        this.update();
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
        // Remove if you want fixed position
        d.fx = null;
        d.fy = null;
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