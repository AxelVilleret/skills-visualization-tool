import { ArrowDropDown } from "@mui/icons-material";
import React, { useState, useEffect, useMemo } from "react";
import { Treebeard } from "react-treebeard";
import treeStyle from "./treeStyle";
import "./style.css";
import { ACTIVE_COLOR, INACTIVE_COLOR, HOVERED_COLOR } from "../../constants";
import { findNode } from "../../utils.js";

const Toggle = ({ node, style }) => {

	return (
		<div
			style={{
				transform: node.toggled ? "rotate(0deg)" : "rotate(-90deg)",
			}}
		>
			{node.children && <ArrowDropDown />}
		</div>
	);
};

const decorators = {
	Loading: (props) => {
		return <div style={props.style}>Loading...</div>;
	},
	Toggle,
	Header: (props) => {
		return <div style={props.style}>{props.node.name}</div>;
	},
	Container: (props) => {
		const metrics = {
			mastery: Math.round(props.node.value.mastery * 100),
			trust: Math.round(props.node.value.trust * 100),
			cover: Math.round(props.node.value.cover * 100),
		};
		const isHovered = props.hoveredNode === props.node.name;
		const isActive = props.node.active;

		const handleMouseOver = () => {
			if (props.onNodeHover) {
				props.onNodeHover(props.node.name);
			}
		};

		const handleMouseOut = () => {
			if (props.onNodeHover) {
				props.onNodeHover(null);
			}
		};

		const containerClass =
			props.node.depth === 0
				? "tree-root"
				: props.node.children
					? "tree-node"
					: "tree-leaf";

		return (
			<div
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onClick={props.onClick}
				className={`d-flex ${containerClass}`}
				role="button"
			>
				<decorators.Toggle {...props} />
				<div
					style={{ color: isHovered ? HOVERED_COLOR : isActive ? ACTIVE_COLOR : INACTIVE_COLOR }}
				>
					{props.node.name}
				</div>
				<div className={`d-flex justify-content-end custom-gap flex-grow-1`}>
					<div>{metrics.mastery} %</div>
					<div>{metrics.trust} %</div>
					<div>{metrics.cover} %</div>
				</div>
			</div>
		);
	},
};

const SkillTree = React.memo(({ data, selectedNode, onSelectNode, hoveredNode, onNodeHover }) => {

	const [treeData, setTreeData] = useState(data);
	const [previousNode, setPreviousNode] = useState(data);

	const currentNode = useMemo(() => {
		return findNode(treeData, selectedNode);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedNode]);

	const onToggle = (node) => {
		onSelectNode(node.name);
		if (node.active || (!node.active && !node.toggled)) {
			node.toggled = !node.toggled;
			setTreeData({ ...treeData });
		}
	};

	useEffect(() => {
		const markNodeAsActive = (node, path = []) => {
			if (node.name === selectedNode) {
				path.forEach((parent) => (parent.toggled = true));
				currentNode.active = true;
			}
			if (node.children) {
				node.children.forEach((child) => markNodeAsActive(child, [...path, node]));
			}
		};
		treeData.active = false;
		
		previousNode.active = false;
		setPreviousNode(currentNode);
		markNodeAsActive(treeData);
		setTreeData({ ...treeData });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentNode]);


	return (
		<div className="w-fit-content">
			<div className="d-flex w-100 justify-content-end pb-3">
				<div className="d-flex w-fit-content header-gap custom-border pb-2">
					<div>Maitrise</div>
					<div>Confiance</div>
					<div>Couverture</div>
				</div>
			</div>
			<Treebeard
				style={treeStyle}
				data={treeData}
				onToggle={onToggle}
				decorators={{ ...decorators, Container: (props) => <decorators.Container {...props} hoveredNode={hoveredNode} onNodeHover={onNodeHover} /> }}
			/>
		</div>
	);
});

export default SkillTree;
