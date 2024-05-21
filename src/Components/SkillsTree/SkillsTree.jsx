import { ArrowDropDown } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Treebeard } from "react-treebeard";
import treeStyle from "./treeStyle";
import "./style.css";
import {
	fetchTreeData,
	findUpdatesByNodeName,
} from "../../Services/TreeDataFetchingService";

const Toggle = ({ style, onClick, node }) => {
	const [isHighlighted, setIsHighlighted] = useState(false);

	const handleToggle = () => {
		console.log("clicked");
		setIsHighlighted(!isHighlighted);
		onClick();
	};

	useEffect(() => {
		setIsHighlighted(false); // Reset highlight when node changes
	}, [onClick]);

	return (
		<div
			style={{
				...style,
				transform: isHighlighted ? "rotate(90deg)" : "rotate(0deg)",
			}}
			className={`toggleEffect`}
			onClick={handleToggle}
		>
			<ArrowDropDown className="toggle-icon" />
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
		const [data, setData] = useState([]);
		const [metrics, setMetrics] = useState({});
		const [isHovered, setIsHovered] = useState(false);

		const fetchData = async () => {
			setData(await fetchTreeData());
		};

		const fetchMetrics = async () => {
			setMetrics(await findUpdatesByNodeName(props.node.name));
		};

		useEffect(() => {
			fetchData();
			fetchMetrics();
		}, []);

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
				<div
					className={`d-flex justify-content-end custom-gap flex-grow-1 ${props.node.active ? `active-node` : "inactive-node"
						}`}
				>
					<div className="score-percentage">{metrics.mastery} %</div>
					<div className="score-percentage">{metrics.trust} %</div>
					<div className="score-percentage">{metrics.cover} %</div>
				</div>
			</div>
		);
	},
};

const SkillTree = React.memo(({ selectedNode, setSelectedNode, setHoveredNode }) => {
	const [data, setData] = useState([]);
	const [cursor, setCursor] = useState(false);

	const fetchData = async () => {
		const treeData = await fetchTreeData();

		const markNodeAsActive = (node, path = []) => {
			if (node.name === selectedNode) {
				node.active = true;
				setCursor(node);
				path.forEach(parent => parent.toggled = true);
				node.toggled = true;
				node.children.forEach(child => child.toggled = true);
			}
			if (node.children) {
				node.children.forEach(child => markNodeAsActive(child, [...path, node]));
			}
		};
		markNodeAsActive(treeData);

		setData(treeData);
	};

	useEffect(() => {
		fetchData();
	}, [selectedNode]);

	const onToggle = (node, toggled) => {
		if (cursor) {
			cursor.active = false;
		}
		node.active = true;
		if (node.children) {
			node.toggled = toggled;
		}
		setCursor(node);
		if (setSelectedNode) {
			setSelectedNode(node.name);
			setData(Object.assign({}, data));
		}

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
				data={data}
				onToggle={onToggle}
				decorators={{ ...decorators, Container: (props) => <decorators.Container {...props} onNodeHover={setHoveredNode} /> }}
			/>
		</div>
	);
})

export default SkillTree;
