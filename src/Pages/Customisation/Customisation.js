import React, { useEffect, useState } from "react";
import DraggableRowsTable from "../../Components/DraggableRowsTable/DraggableRowsTable";
import ColorPalette from "../../Components/ColorPalette/ColorPalette";
import Badge from "../../Components/Badge/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { Container, Row, Col, Tabs, Tab, Form } from "react-bootstrap";
import { localStorageService } from "../../Services/LocalStorageService";
import { LOCAL_STORAGE_KEYS, COLOR_PALETTES, DEFAULT_COLOR_PALETTE, DEFAULT_TAB_ORDER } from "../../constants";

export default function Page_parameters() {
	const [multiCompetenceTabs, setMultiCompetenceTabs] = useState(DEFAULT_TAB_ORDER);

	const [selectedPalette, setSelectedPalette] = useState(null);
	const [activeTab, setActiveTab] = useState("ongletsMulticompetence");

	useEffect(() => {
		setMultiCompetenceTabs(
			localStorageService.getItem(LOCAL_STORAGE_KEYS.TAB_ORDER) || multiCompetenceTabs
		);

		setSelectedPalette(
			localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE
		);
	}, []);

	const handlePaletteSelect = (colors, setIsSelected) => {
		setIsSelected(true);
		localStorageService.setItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE, colors);
		setSelectedPalette(colors);
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
					<Tab eventKey={"ongletsMulticompetence"} title={"Ordre des onglets"}>
							<DraggableRowsTable name={"multicompetence-preference"} elements={multiCompetenceTabs}setElements={setMultiCompetenceTabs}/>
					</Tab>
					<Tab eventKey={"colorPalette"} title={"Palette de couleurs"}>
							<div className="d-flex">
								{COLOR_PALETTES.map((palette) => (
									<ColorPalette colors={palette} handleSelect={handlePaletteSelect} selectedPalette={selectedPalette}>
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
