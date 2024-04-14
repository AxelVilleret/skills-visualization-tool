import React, { useEffect, useState } from "react";
import DraggableRowsTable from "../Components/DraggableRowsTable/DraggableRowsTable";
import ColorPalette from "../Components/ColorPalette/ColorPalette";
import Badge from "../Components/Badge/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { Container, Row, Col, Tabs, Tab, Form } from "react-bootstrap";

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
		<div className="container">
			<p style={{ fontWeight: 700, fontSize: "2rem" }}>Personnalisation</p>
			<p style={{ color: "#888", marginTop: "17px" }}>
				Vous pouvez personnaliser votre page pour une expérience unique.
			</p>

			<Tabs activeKey={activeTab} onSelect={handleTabChange} className="mt-5">
				<Tab
					eventKey={"ongletsMulticompetence"}
					title={"Onglets multicompetence"}
					key={"ongletsMulticompetence"}
				>
					<div className="mt-5">
						<p style={{ fontWeight: 700, fontSize: "1.3rem" }}>
							Ordre des oglets pour les visualisations multicompetence
						</p>
						<p style={{ color: "#888", marginBottom: "3rem" }}>
							Organisez l'ordre des onglets selon vos préférences avec un simple
							drag & drop.
						</p>
						<DraggableRowsTable
							name={"multicompetence-preference"}
							elements={multiCompetenceTabs}
							setElements={setMultiCompetenceTabs}
						/>
					</div>
				</Tab>
				<Tab eventKey={"colorPalette"} title={"Couleurs"} key={"colorPalette"}>
					<div className="mt-5">
						<p style={{ fontWeight: 700, fontSize: "1.3rem" }}>
							Palette de couleurs
						</p>
						<p style={{ color: "#888", marginBottom: "3rem" }}>
							Personnalisez la palette de couleurs en selectionnant votre
							palette préférée.
						</p>
						<div className="d-flex flex-wrap" style={{ gap: "50px" }}>
							<ColorPalette
								colors={["#26547c", "#ef476f", "#ffd166"]}
								handleSelect={handlePaletteSelect}
								selected={selected}
							>
								<Badge>
									<CheckIcon style={{ color: "white" }} />
								</Badge>
							</ColorPalette>
							<ColorPalette
								colors={["#002642", "#840032", "#e59500"]}
								handleSelect={handlePaletteSelect}
								selected={selected}
							>
								<Badge>
									<CheckIcon style={{ color: "white" }} />
								</Badge>
							</ColorPalette>
							<ColorPalette
								colors={["#f1dede", "#d496a7", "#5d576b"]}
								handleSelect={handlePaletteSelect}
								selected={selected}
							>
								<Badge>
									<CheckIcon style={{ color: "white" }} />
								</Badge>
							</ColorPalette>
						</div>
					</div>
				</Tab>
			</Tabs>
		</div>
	);
}
