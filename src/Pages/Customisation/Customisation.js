import React, { useEffect, useState } from "react";
import DraggableRowsTable from "../../Components/DraggableRowsTable/DraggableRowsTable";
import ColorPalette from "../../Components/ColorPalette/ColorPalette";
import Badge from "../../Components/Badge/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { Container, Tabs, Tab } from "react-bootstrap";
import { localStorageService } from "../../Services/LocalStorageService";
import { LOCAL_STORAGE_KEYS, COLOR_PALETTES, DEFAULT_COLOR_PALETTE, DEFAULT_TAB_ORDER } from "../../constants";

const TABS = [
	"Ordre des onglets",
	"Palette de couleurs",
];

export default function Page_parameters() {
	const [tabsOrder, setTabsOrder] = useState([]);
	const [selectedPalette, setSelectedPalette] = useState(null);
	const [activeTab, setActiveTab] = useState(TABS[0]);

	useEffect(() => {
		setTabsOrder(localStorageService.getItem(LOCAL_STORAGE_KEYS.TAB_ORDER) || DEFAULT_TAB_ORDER);
		setSelectedPalette(localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE);
	}, []);

	const handlePaletteSelect = (colors, setIsSelected) => {
		setIsSelected(true);
		localStorageService.setItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE, colors);
		setSelectedPalette(colors);
	};

	const handleTabsOrderChange = (newOrder) => {
		localStorageService.setItem(LOCAL_STORAGE_KEYS.TAB_ORDER, newOrder);
		setTabsOrder(newOrder);
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
					<Tab eventKey={TABS[0]} title={TABS[0]}>
						<DraggableRowsTable tabsOrder={tabsOrder} onTabsOrderChange={handleTabsOrderChange}/>
					</Tab>
					<Tab eventKey={TABS[1]} title={TABS[1]}>
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
