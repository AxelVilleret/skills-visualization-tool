import React, { useMemo, useState, useCallback } from "react";
import { Container, Tabs, Tab, } from "react-bootstrap";
import SkillTree from "../../Components/SkillsTree/SkillsTree.jsx";
import MultiLines from "../../Components/MultiLines/MultiLines.jsx";
import { adaptDataFormat } from "../../Services/AdapterService.js";
import Legend from "../../Components/Legend/Legend.jsx";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs.jsx";
import {
	AccessTimeOutlined,
	LibraryBooksOutlined,
} from "@mui/icons-material";
import CustomPopover from "../../Components/CustomPopover/CustomPopover.jsx";
import { LOCAL_STORAGE_KEYS, DEFAULT_COLOR_PALETTE, DEFAULT_TAB_ORDER, METRICS } from "../../constants.js";
import { localStorageService } from "../../Services/LocalStorageService.js";
import Chart from "../../Components/charts/Chart.jsx";

const LEGEND = [
	"Niveau inférieur à 40 %",
	"Niveau situé entre 40 et 80 %",
	"Niveau supérieur à 80 %",
];

export default function Dashboard({ data }) {
	const CHART_TYPES = useMemo(() => localStorageService.getItem(LOCAL_STORAGE_KEYS.TAB_ORDER) || DEFAULT_TAB_ORDER, []);
	const today = new Date().toISOString("fr-FR");
	const [activeTab, setActiveTab] = useState(CHART_TYPES[0].key);
	const [date, setDate] = useState(today);
	const [selectedNode, setSelectedNode] = useState(data[0].name);
	const [metric, setMetric] = useState(METRICS[0].key);
	const [hoveredNode, setHoveredNode] = useState(null);

	const formattedData = useMemo(() => adaptDataFormat(data, date, selectedNode), [data, date, selectedNode]);

	const handleTabChange = useCallback((tabKey) => {
		setActiveTab(tabKey);
	}, []);

	const handleMetricChange = useCallback((event) => {
		setMetric(event.target.value);
	}, []);

	return (
		<Container>
			<h1>Dashboard</h1>
			<p>Ici, vous pouvez visualiser vos compétences et leur évolution dans le temps.</p>
			<div className="shadow-sm border p-4">
				<h2>Evolution temporelle</h2>
				<p>Vous pouvez sélectionner une date pour visualiser vos compétences à ce moment-là.</p>
				<MultiLines data={data} onSelectDate={setDate} selectedSkill={selectedNode} onSelectSkill={setSelectedNode} />
			</div>

			<div className="d-flex justify-content-between mt-3 gap-3">
				<div className="shadow-sm border p-4 w-50">
					<h2>Hiérarchie</h2>
					<p>Vous pouvez sélectionner une compétence dans la hiérarchie ci-dessous.</p>
					<SkillTree data={formattedData} selectedNode={selectedNode} setSelectedNode={setSelectedNode} setHoveredNode={setHoveredNode} />
				</div>

				<div className="shadow-sm border p-4 w-50">
					<h2>Graphes</h2>
					<p>Choisissez votre type de graphe préféré pour visualiser vos compétences.</p>
					<Breadcrumbs
						breadcrumbs={[
							{
								icon: <AccessTimeOutlined fontSize="small" />,
								label: new Date(date).toLocaleString().split(" ")[0],
							},
							{
								icon: <LibraryBooksOutlined fontSize="small" />,
								label: selectedNode,
							},
						]}
					/>
					<FormControl fullWidth>
						<Select value={metric} onChange={handleMetricChange}>
							{METRICS.map((metric) => (
								<MenuItem key={metric.key} value={metric.key}>
									{metric.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Tabs activeKey={activeTab} onSelect={handleTabChange}>
						{CHART_TYPES.map((chart) => (
							<Tab eventKey={chart} title={chart} key={chart}>
								<Chart type={chart} data={formattedData} colorScale={localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE} setSelectedNode={setSelectedNode} hoveredNode={hoveredNode} metric={metric} />
							</Tab>
						))}
					</Tabs>
					<div className="d-flex justify-content-end">
						<CustomPopover>
							<Legend
								colorScale={
									JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)) ||
									DEFAULT_COLOR_PALETTE
								}
								titles={LEGEND}
							/>
						</CustomPopover>
					</div>
				</div>
			</div>
		</Container>
	);
}