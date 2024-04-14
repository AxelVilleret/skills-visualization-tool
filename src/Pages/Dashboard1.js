import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tabs, Tab, Form } from "react-bootstrap";
import SunburstChart from "../Components/SunBurstGraph/SunBurst.jsx";
import PartitionDiagram from "../Components/PartitionGraph/Partition.jsx";
import SkillTree from "../Components/SkillsTree/SkillTree.js";
import { MultiLineGraphCard } from "../Components/multiSeriesLineChart/MultiLineGraphCard";
import CirclePacking from "../Components/CirclePackingGraph/CirclePacking.jsx";
import DashboardLayout from "./Layout.js";
import { fetchTabs, sortTabs } from "../Services/TabsFetchingService.js";
import { convertFormatAtoB } from "../Services/AdapterMultiCompetencesService.js";
import Legend from "../Components/LegendComponent.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import "./styles/style-dashboard2.css";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs.jsx";
import BreadcrumbsComponent from "../Components/Breadcrumbs/Breadcrumbs.jsx";
import {
	AccessTimeOutlined,
	AnalyticsOutlined,
	CalendarMonthOutlined,
	LibraryBooksOutlined,
} from "@mui/icons-material";
import PopoverComponent from "../Components/Popover/PopoverComponent.jsx";

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
			<p className="header">Bienvenue, étudiant ANON !</p>
			<p className="description">
				Ici, vous pouvez visualiser une compétence spécifique et son évolution dans le temps.
			</p>
			<div className="dashboard-wrapper">
				<div
					style={{
						height: "100%",
					}}
				>
					<div
						style={{
							padding: "10px",
							width: "100%",
						}}
					>
						<MultiLineGraphCard
							setSelectedDate={setDate}
							selectedSkil={selectedNode}
							setSelectedSkil={setSelectedNode}
						/>
					</div>
				</div>
				<div
					className="d-flex justify-content-between mt-5"
					style={{ gap: "20px" }}
				>
					<div
						style={{
							padding: "20px",
							width: "100%",
						}}
						className="card-shadow"
					>
						<p style={{ fontWeight: 700, fontSize: "1.5rem" }}>Hiérarchie</p>
						<p
							style={{
								color: "rgb(136,136,136)",
							}}
						>
							Vous pouvez sélectionner une compétence dans la hiérarchie ci-dessous.
						</p>
						<SkillTree
							selectedNode={selectedNode}
							setSelectedNode={setSelectedNode}
							setHoveredNode={setHoveredNode}
						/>
					</div>
				</div>
			</div>
			<Form>
				<Form.Group controlId="selectSkill" className="formSelect">
					{/* <Row>
						<Col>
							<Form.Label>Select Skill</Form.Label>
						</Col>
					</Row> */}
					{/* <Row>
						<Col>
							<Form.Control
								as="select"
								value={metric}
								onChange={handleMetricChange}
							>
								<option key={"mastery"} value={"mastery"}>
									mastery
								</option>
								<option key={"trust"} value={"trust"}>
									trust
								</option>
								<option key={"cover"} value={"cover"}>
									cover
								</option>
							</Form.Control>
						</Col>
					</Row> */}
				</Form.Group>
			</Form>
			{/* <h1>
				{date} - Ensemble de compétences "{selectedNode}"
			</h1> */}

			{/* <Row>
				<Col md={12}>
					<div
						style={{
							border: "1px solid #ddd",
							padding: "10px",
						}}
					>
						<SkillTree
							selectedNode={selectedNode}
							setSelectedNode={setSelectedNode}
							setHoveredNode={setHoveredNode}
						/>
					</div>
				</Col>
			</Row> */}
		</Container>
	);
}
