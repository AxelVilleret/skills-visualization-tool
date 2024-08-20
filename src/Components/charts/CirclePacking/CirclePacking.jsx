import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LOCAL_STORAGE_KEYS, DEFAULT_COLOR_PALETTE } from '../../../constants.js';
import { localStorageService } from '../../../Services/LocalStorageService.js';

const CirclePacking = ({ data, onSelectNode, hoveredNode }) => {

    const colorScale = localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE

    const ref = useRef();

    useEffect(() => {
        const width = 928;
        const height = width;
        const margin = 1;
        const format = d3.format(",d");

        const pack = d3.pack()
            .size([width - margin * 2, height - margin * 2])
            .padding(3);

        const updateChart = (newData) => {
            const root = pack(d3.hierarchy(newData)
                .eachBefore(d => d.data.id = d.data.value * 100)
                .sum(d => d.value * 100)
                .sort((a, b) => b.value - a.value));

            d3.select(ref.current)
                .selectAll("*")
                .remove();

            const svgContainer = d3.select(ref.current)
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-margin, -margin, width, height])
                .attr("style", "width: 100%; height: auto; font: 10px sans-serif;")
                .attr("text-anchor", "middle");

            const node = svgContainer.append("g")
                .selectAll()
                .data(root.descendants())
                .join("g")
                .attr("transform", d => `translate(${d.x},${d.y})`);

            node.append("title")
                .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.data.id)}`);

            node.append("circle")
                .attr("fill", d => {
                    if (d.data.name === hoveredNode) {
                        return "#00FF00";
                    }
                    else if (d.data.id <= 40) {
                        return colorScale[0];
                    } else if (d.data.id > 40 && d.data.id <= 80) {
                        return colorScale[1];
                    } else {
                        return colorScale[2];
                    }
                })
                .attr("stroke", d => !d.children ? "#000" : "#bbb")
                .attr("r", d => d.r);

            const text = node
                .filter(d => !d.children && d.r > 10)
                .append("text")
                .attr("clip-path", d => `circle(${d.r})`);

            text.selectAll()
                .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
                .join("tspan")
                .attr("x", 0)
                .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
                .text(d => d);

            text.append("tspan")
                .attr("x", 0)
                .attr("y", d => `${d.data.name.split(/(?=[A-Z][a-z])|\s+/g).length / 2 + 0.35}em`)
                .attr("fill-opacity", 0.7)
                .text(d => format(d.value));
        };

        updateChart(data);

        const svgContainer = d3.select(ref.current);

        svgContainer.selectAll("circle").on("click", (event, d) => {
            updateChart(d.data);
            onSelectNode(d.data.name);
        });
    }, [data, colorScale, hoveredNode, onSelectNode]);

    return <svg ref={ref} />;
};

export default CirclePacking;
