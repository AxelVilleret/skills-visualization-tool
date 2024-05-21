import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, } from "react-bootstrap";
import SunburstChart from "../../Components/Sunburst/Sunburst.jsx";
import PartitionDiagram from "../../Components/Partition/Partition.jsx";
import SkillTree from "../../Components/SkillsTree/SkillsTree.jsx";
import MultiLines from "../../Components/MultiLines/MultiLines.jsx";
import CirclePacking from "../../Components/CirclePacking/CirclePacking.jsx";
import { fetchTabs, sortTabs } from "../../Services/TabsFetchingService.js";
import { convertFormatAtoB } from "../../Services/AdapterMultiCompetencesService.js";
import Legend from "../../Components/Legend/Legend.jsx";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs.jsx";
import {
	AccessTimeOutlined,
	LibraryBooksOutlined,
} from "@mui/icons-material";
import PopoverComponent from "../../Components/CustomPopover/Popover.jsx";

export default function Dashboard2({ data }) {
	const today = new Date().toISOString("fr-FR");
	const [dataSunburst, setDataSunburst] = useState({});
	const [tabs, setTabs] = useState([]);
	const [activeTab, setActiveTab] = useState("sunburst");
	const [date, setDate] = useState(today);
	const [selectedNode, setSelectedNode] = useState(null);
	const [metric, setMetric] = useState("mastery");
	const [hoveredNode, setHoveredNode] = useState(null);

	const convertData = () =>
		setDataSunburst(convertFormatAtoB(data, date, selectedNode, metric));

	const palette = ["#26547c", "#ef476f", "#ffd166"];

	useEffect(() => {
		convertData();
	}, []);

	useEffect(() => {
		if (Object.keys(dataSunburst).length > 0) {
			setTabs(
				sortTabs(fetchTabs("multicompetence-preference"), [
					{
						key: "sunburst",
						title: "Sunburst Chart",
						eventKey: "sunburst",
						content: (
							<SunburstChart
								data={dataSunburst}
								colorScale={
									JSON.parse(localStorage.getItem("color-palette")) || palette
								}
								setSelectedNode={setSelectedNode}
								hoveredNode={hoveredNode}
							/>
						),
					},
					{
						key: "partition",
						title: "Partition Diagram",
						eventKey: "partition",
						content: (
							<PartitionDiagram
								data={dataSunburst}
								colorScale={
									JSON.parse(localStorage.getItem("color-palette")) || palette
								}
								setSelectedNode={setSelectedNode}
								hoveredNode={hoveredNode}
							/>
						),
					},
					{
						key: "circlePacking",
						title: "Circle Packing",
						eventKey: "circlePacking",
						content: (
							<CirclePacking
								data={dataSunburst}
								colorScale={
									JSON.parse(localStorage.getItem("color-palette")) || palette
								}
								setSelectedNode={setSelectedNode}
								hoveredNode={hoveredNode}
							/>
						),
					},
				])
			);
		}
	}, [dataSunburst]);

	useEffect(() => {
		convertData();
	}, [selectedNode, date, metric, hoveredNode]);

	const handleTabChange = (tabKey) => {
		setActiveTab(tabKey);
	};

	const handleMetricChange = (event) => {
		setMetric(event.target.value);
		convertData();
	};

	return (
		<Container>
			<h1>Dashboard</h1>
			<p>Ici, vous pouvez visualiser vos compétences et leur évolution dans le temps.</p>
			<div className="d-flex flex-column">
				<div className="shadow-sm border p-4">
					<h2>Evolution temporelle</h2>
					<MultiLines setSelectedDate={setDate} selectedSkil={selectedNode} setSelectedSkil={setSelectedNode} />
				</div>
				
				<div className="d-flex justify-content-between mt-3 gap-3">
					<div className="shadow-sm border p-4 w-50">
						<h2>Hiérarchie</h2>
							<p>Vous pouvez sélectionner une compétence dans la hiérarchie ci-dessous.</p>
						<SkillTree selectedNode={selectedNode} setSelectedNode={setSelectedNode} setHoveredNode={setHoveredNode}/>
					</div>
					<div className="shadow-sm border p-4 w-50">
						<h2>Graphes</h2>
						<p>Choisissez votre type de graphe préféré pour visualiser vos compétences.</p>
							<Breadcrumbs
								breadcrumbs={[
									{
										icon: <AccessTimeOutlined fontSize="small" />,
										label: new Date(date).toLocaleString(),
									},
									{
										icon: <LibraryBooksOutlined fontSize="small" />,
										label: selectedNode,
									},
								]}
							/>
						<FormControl fullWidth>
							<Select value={metric} onChange={handleMetricChange}>
								<MenuItem value={"mastery"}>Maitrise</MenuItem>
								<MenuItem value={"trust"}>Confiance</MenuItem>
								<MenuItem value={"cover"}>Couverture</MenuItem>
							</Select>
						</FormControl>
						{tabs.length > 0 && (
							<>
								<Tabs
									activeKey={activeTab}
									onSelect={handleTabChange}
								>
									{tabs.map((tab) => (
										<Tab
											eventKey={tab?.eventKey}
											title={tab?.title}
											key={tab?.key}
										>
											{tab?.content}
										</Tab>
									))}
								</Tabs>
								<div className="d-flex justify-content-end">
									<PopoverComponent>
										<Legend
											colorScale={
												JSON.parse(localStorage.getItem("color-palette")) ||
												palette
											}
											titles={[
												"Niveau inférieur à 40 %",
												"Niveau situé entre 40 et 80 %",
												"Niveau supérieur à 80 %",
											]}
										/>
									</PopoverComponent>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
}
