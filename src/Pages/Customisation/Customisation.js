import React, { useEffect, useState } from "react";
import DraggableRowsTable from "../../Components/DraggableRowsTable/DraggableRowsTable";
import ColorPalette from "../../Components/ColorPalette/ColorPalette";
import Badge from "../../Components/Badge/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { Container, Row, Col, Tabs, Tab, Form } from "react-bootstrap";

export const colorPalettes = [
	["#26547c", "#ef476f", "#ffd166"],
	["#002642", "#840032", "#e59500"],
	["#f1dede", "#d496a7", "#5d576b"],
];

export default function Page_parameters() {
	const [multiCompetenceTabs, setMultiCompetenceTabs] = useState([
		"Sunburst Chart",
		"Partition Diagram",
		"Circle Packing",
	]);

	const [selected, setSelected] = useState(["#26547c", "#ef476f", "#ffd166"]);
	const [activeTab, setActiveTab] = useState("ongletsMulticompetence");
	const [monoCompetenceTabs, setMonoCompetenceTabs] = useState(["Line Graph"]);

	useEffect(() => {
		setMultiCompetenceTabs(
			(old) =>
				JSON.parse(localStorage.getItem("multicompetence-preference")) || old
		);

		setMonoCompetenceTabs(
			(old) =>
				JSON.parse(localStorage.getItem("monocompetence-preference")) || old
		);
	}, []);

	const handlePaletteSelect = (colors, setIsSelected) => {
		setIsSelected(true);
		localStorage.setItem("color-palette", JSON.stringify(colors));
		setSelected((_) => colors);
	};

	const handleTabChange = (tabKey) => {
		setActiveTab(tabKey);
	};

	return (
		<Container>
			<h1>Personnalisation</h1>
			<p>Vous pouvez personnaliser votre page pour une expérience unique.</p>
			<div className="shadow-sm border p-4">
				<Tabs activeKey={activeTab} onSelect={handleTabChange}>
					<Tab eventKey={"ongletsMulticompetence"} title={"Onglets multicompetence"} key={"ongletsMulticompetence"}>
							<DraggableRowsTable name={"multicompetence-preference"} elements={multiCompetenceTabs}setElements={setMultiCompetenceTabs}/>
					</Tab>
					<Tab eventKey={"colorPalette"} title={"Couleurs"} key={"colorPalette"}>
							<div className="d-flex flex-wrap" style={{ gap: "50px" }}>
								{colorPalettes.map((palette, index) => (
									<ColorPalette
										colors={palette}
										handleSelect={handlePaletteSelect}
										selected={selected}
									>
										<Badge>
											<CheckIcon style={{ color: "white" }} />
										</Badge>
									</ColorPalette>
								))}
							</div>
					</Tab>
				</Tabs>
			</div>

			
		</Container>
	);
}
