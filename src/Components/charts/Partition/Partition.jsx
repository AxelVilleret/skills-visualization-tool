import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LOCAL_STORAGE_KEYS, DEFAULT_COLOR_PALETTE } from '../../../constants.js';
import { localStorageService } from '../../../Services/LocalStorageService.js';

const PartitionDiagram = ({ data, onSelectNode, hoveredNode }) => {

  const colorScale = localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE

  const ref = useRef();

  useEffect(() => {

    const width = 928;
    const height = width;
    const format = d3.format(",d");

    const partitionLayout = d3.partition()
      .size([width, height])
      .padding(3);

    const updateChart = (newData) => {
      const root = partitionLayout(d3.hierarchy(newData)
        .eachBefore(d => d.data.id = d.data.value * 100)
        .sum(d => d.value * 100)
        .sort((a, b) => b.value - a.value));

      d3.select(ref.current)
        .selectAll("*")
        .remove();

      const svgContainer = d3.select(ref.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -width / 2, width, width])
        .attr("style", "width: 100%; height: auto; font: 10px sans-serif;")
        .attr("text-anchor", "middle");

      const node = svgContainer.append("g")
        .selectAll("rect")
        .data(root.descendants())
        .join("rect")
        .attr("x", d => d.x0 - width / 2)
        .attr("y", d => d.y0 - height / 2)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => {
          if (d.data.name === hoveredNode) {
            return "#00FF00";
          } else if (d.data.id <= 40) {
            return colorScale[0];
          } else if (d.data.id > 40 && d.data.id <= 80) {
            return colorScale[1];
          } else {
            return colorScale[2];
          }
        });

      node.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.data.id)}`);

      node.on("click", (event, d) => {
        updateChart(d.data);
        onSelectNode(d.data.name);
      });

      // Add text to each rectangle
      svgContainer.append("g")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .attr("x", d => d.x0 - width / 2 + (d.x1 - d.x0) / 2)
        .attr("y", d => d.y0 - height / 2 + (d.y1 - d.y0) / 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "#000")
        .attr("font-size", "10px")
        .text(d => {
          const text = `${d.data.name} ${Math.round(d.data.value * 100)}`;
          const textLengthEstimate = text.length * 6; // 6 is an estimate of the width of a character
          if (textLengthEstimate < (d.x1 - d.x0)) {
            return text;
          } else {
            return ''; // Don't display the text if there's not enough space
          }
        });
    };

    updateChart(data);
  }, [data, colorScale, hoveredNode, onSelectNode]);

  return <svg ref={ref} />;
};

export default PartitionDiagram;
