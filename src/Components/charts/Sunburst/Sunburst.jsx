import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LOCAL_STORAGE_KEYS, DEFAULT_COLOR_PALETTE } from '../../../constants.js';
import { localStorageService } from '../../../Services/LocalStorageService.js';

const SunburstChart = ({ data, onSelectNode, hoveredNode }) => {

  const colorScale = localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE

  const ref = useRef();

  useEffect(() => {
    const width = 928;
    const height = width;
    const radius = Math.min(width, height) / 2;
    const format = d3.format(",d");

    const partition = d3.partition().size([2 * Math.PI, radius]);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

    const updateChart = (newData) => {
      const root = partition(d3.hierarchy(newData)
        .eachBefore(d => d.data.id = d.data.value * 100)
        .sum(d => d.value * 100)
        .sort((a, b) => b.value - a.value));

      const svg = d3.select(ref.current)
        .selectAll("*")
        .remove();

      const svgContainer = d3.select(ref.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "width: 100%; height: auto; font: 10px sans-serif;")
        .attr("text-anchor", "middle");

      const node = svgContainer.append("g")
        .selectAll("path")
        .data(root.descendants())
        .join("path")
        .attr("fill", d => {
          if (d.data.name === hoveredNode) {
            return "#00FF00";
          }
          else if (d.data.value <= 0.4) {
            return colorScale[0];
          } else if (d.data.value > 0.4 && d.data.value <= 0.8) {
            return colorScale[1];
          } else {
            return colorScale[2];
          }
        })
        .attr("d", arc);

      node.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.data.id)}`);

      node.on("click", (event, d) => {
        updateChart(d.data);
        onSelectNode(d.data.name);
      });

      // Add text to each path
      const text = svgContainer.append("g")
        .selectAll("text")
        .data(root.descendants().filter(d => d.depth))
        .join("text")
        .attr("transform", function (d) {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2 * radius;
          return `rotate(${x - 90}) translate(${y},0) ${x < 180 ? "" : "rotate(180)"}`;
        })
        .attr("dy", "0.35em")
        .text(d => `${d.data.name} ${Math.round(d.data.value * 100)}`)
        .attr("fill", "#000")
        .attr("font-size", "10px")
        .attr("text-anchor", d => d.x0 < Math.PI === !d.children ? "start" : "end");
    };

    updateChart(data);
  }, [data, colorScale, hoveredNode]);

  return <svg ref={ref} />;
};

export default SunburstChart;
