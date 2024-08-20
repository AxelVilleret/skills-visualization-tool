import React from 'react';
import SunburstChart from "./Sunburst/Sunburst.jsx";
import PartitionDiagram from "./Partition/Partition.jsx";
import CirclePacking from "./CirclePacking/CirclePacking.jsx";
import { DEFAULT_TAB_ORDER } from '../../constants.js';
import { updateTreeValues } from '../../Services/AdapterService.js';

const Chart = ({ type, data, onSelectNode, hoveredNode, metric }) => {

    data = updateTreeValues(data, metric);
    switch (type) {
        case DEFAULT_TAB_ORDER[0]:
            return (
                <SunburstChart
                    data={data}
                    onSelectNode={onSelectNode}
                    hoveredNode={hoveredNode}
                />
            );
        case DEFAULT_TAB_ORDER[1]:
            return (
                <PartitionDiagram
                    data={data}
                    onSelectNode={onSelectNode}
                    hoveredNode={hoveredNode}
                />
            );
        case DEFAULT_TAB_ORDER[2]:
            return (
                <CirclePacking
                    data={data}
                    onSelectNode={onSelectNode}
                    hoveredNode={hoveredNode}
                />
            );
        default:
            return null;
    }
};

export default Chart;
