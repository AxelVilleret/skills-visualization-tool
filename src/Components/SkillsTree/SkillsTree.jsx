import { ArrowDropDown } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Treebeard } from "react-treebeard";
import treeStyle from "./treeStyle";
import "./style.css";

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
		const [isHovered, setIsHovered] = useState(false);

		const handleMouseOver = () => {
			setIsHovered(true);
			if (props.onNodeHover) {
				props.onNodeHover(props.node.name);
			}
		};

		const handleMouseOut = () => {
			setIsHovered(false);
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
					className={
						props.node.active ? `active-node` : isHovered ? "hovered-node" : "inactive-node"
					}
				>
					{props.node.name}
				</div>
				<div className={`d-flex justify-content-end custom-gap flex-grow-1 ${props.node.active ? `active-node` : "inactive-node"}`}>
					<div className="score-percentage">{metrics.mastery} %</div>
					<div className="score-percentage">{metrics.trust} %</div>
					<div className="score-percentage">{metrics.cover} %</div>
				</div>
			</div>
		);
	},
};

const SkillTree = React.memo(({ data, selectedNode, setSelectedNode, setHoveredNode }) => {
	const [treeData, setTreeData] = useState({ ...data, toggled: true });
	const [currentNode, setCurrentNode] = useState(treeData);
	const [isMounted, setIsMounted] = useState(false);

	const updateData = () => {
		const markNodeAsActive = (node, path = []) => {
			if (node.name === selectedNode) {
				path.forEach(parent => parent.toggled = true);
			}
			if (node.children) {
				node.children.forEach(child => markNodeAsActive(child, [...path, node]));
			}
		};
		markNodeAsActive(treeData);
		setTreeData({ ...treeData });
	};

	useEffect(() => {
		if (isMounted) {
			updateData();
		} else {
			setIsMounted(true);
		}
	}, [selectedNode]);

	const onToggle = (node) => {
		currentNode.active = false;
		console.log(currentNode);
		node.active = true;
		node.toggled = true;
		setCurrentNode(node);
		setSelectedNode(node.name);
	};

	return (
		<div className="w-fit-content">
			<div className="d-flex w-100 justify-content-end pb-3">
				<div className="d-flex w-fit-content header-gap custom-border pb-2">
					<div className="table-header">Maitrise</div>
					<div className="table-header">Confiance</div>
					<div className="table-header">Couverture</div>
				</div>
			</div>
			<Treebeard
				className="tree-container"
				style={treeStyle}
				data={treeData}
				onToggle={onToggle}
				decorators={{ ...decorators, Container: (props) => <decorators.Container {...props} onNodeHover={setHoveredNode} /> }}
			/>
		</div>
	);
});

export default SkillTree;
