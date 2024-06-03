import React from 'react';
import SunburstChart from "./Sunburst/Sunburst.jsx";
import PartitionDiagram from "./Partition/Partition.jsx";
import CirclePacking from "./CirclePacking/CirclePacking.jsx";
import { DEFAULT_TAB_ORDER } from '../../constants.js';

const Chart = ({ type, data, colorScale, setSelectedNode, hoveredNode }) => {
    switch (type) {
        case DEFAULT_TAB_ORDER[0]:
            return (
                <SunburstChart
                    data={data}
                    colorScale={colorScale}
                    setSelectedNode={setSelectedNode}
                    hoveredNode={hoveredNode}
                />
            );
        case DEFAULT_TAB_ORDER[1]:
            return (
                <PartitionDiagram
                    data={data}
                    colorScale={colorScale}
                    setSelectedNode={setSelectedNode}
                    hoveredNode={hoveredNode}
                />
            );
        case DEFAULT_TAB_ORDER[2]:
            return (
                <CirclePacking
                    data={data}
                    colorScale={colorScale}
                    setSelectedNode={setSelectedNode}
                    hoveredNode={hoveredNode}
                />
            );
        default:
            return null;
    }
};

export default Chart;
