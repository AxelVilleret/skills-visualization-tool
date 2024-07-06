import React, { useCallback, useMemo, useState } from "react";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Form, } from "react-bootstrap";
import zoomPlugin from "chartjs-plugin-zoom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LOCAL_STORAGE_KEYS, DEFAULT_COLOR_PALETTE } from "../../constants.js";
import { localStorageService } from "../../Services/LocalStorageService.js";

ChartJS.register(
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	zoomPlugin
);

function convertFrenchToAmericanFormat(frenchDate) {
	let parts = frenchDate.split("/");
	let americanDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
	return americanDate;
}

function MultiLineGraph({ data, onSelectDate, selectedSkill, onSelectSkill }) {

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [focusedInput, setFocusedInput] = useState(null);
	const [showCoverLine, setShowCoverLine] = useState(true);

	const updates = useMemo(() => data.find((skill) => skill.name === selectedSkill)?.updates.sort((a, b) => {
		return new Date(a.timestamp) - new Date(b.timestamp)
	}
	) || [], [data, selectedSkill]);

	const minUpdatesDate = useMemo(() => updates.length > 0 ? updates[0].timestamp : "", [updates]);

	const maxUpdatesDate = useMemo(() => updates.length > 0 ? updates[updates.length - 1].timestamp : "", [updates]);

	const filteredUpdates = useMemo(() => updates.filter(
		(update) => {
			let americanFormat = convertFrenchToAmericanFormat(update.timestamp);
			return (!startDate || new Date(americanFormat).getTime() >= new Date(startDate).getTime()) && (!endDate || new Date(americanFormat).getTime() <= new Date(endDate).getTime());
		}
	), [updates, startDate, endDate]);

	const formatedDataForChart = useMemo(() => {

		const formattedData = {
			labels: filteredUpdates.map((update) => update.timestamp),
			datasets: [
				{
					label: "Maitrise",
					data: filteredUpdates.map((update) => update.mastery),
					backgroundColor:
						localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[0] || DEFAULT_COLOR_PALETTE[0],
					borderColor:
						localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[0] || DEFAULT_COLOR_PALETTE[0],
					tension: 0.4,
				},

				{
					label: "Couverture",
					data: filteredUpdates.map((update) =>
						showCoverLine ? update.cover : null
					),
					backgroundColor:
						localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[1] || DEFAULT_COLOR_PALETTE[1],
					borderColor:
						localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[1] || DEFAULT_COLOR_PALETTE[1],
					tension: 0.4,
					hidden: !showCoverLine,
				},

				{
					label: "Borne supérieure de l'intervalle de confiance",
					data: filteredUpdates.map(
						(update) => Math.min(update.mastery + 0.3*(1 - update.trust), 1)
					),
					backgroundColor: localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[2] || DEFAULT_COLOR_PALETTE[2],
					borderColor: localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[2] || DEFAULT_COLOR_PALETTE[2],
					borderWidth: 1,
					type: "line",
					fill: "+1",
					tension: 0.1,
				},
				{
					label: "Borne inférieure de l'intervalle de confiance",
					data: filteredUpdates.map(
						(update) => Math.max(update.mastery - 0.3*(1 - update.trust), 0)
					),
					backgroundColor: localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[2] || DEFAULT_COLOR_PALETTE[2],
					borderColor: localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE)[2] || DEFAULT_COLOR_PALETTE[2],
					borderWidth: 1,
					type: "line",
					fill: "-1",
				},
			],
		};
		return formattedData;
	}, [filteredUpdates, showCoverLine]);




	const zoomOptions = {
		zoom: {
			drag: {
				enabled: true,
			},
			wheel: {
				enabled: true,
			},
			pinch: {
				enabled: true,
			},
			mode: "xy",
		},
	};
	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			zoom: zoomOptions,
		},
		onClick: function (evt, elements) {
			if (elements.length > 0) {
				const index = elements[0].index;
				onSelectDate(formatedDataForChart.labels[index]);
			}
		},
	};

	
















	const handleSkillChange = (event) => {
		onSelectSkill(event.target.value);
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
		setFocusedInput("endDate");
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
		setFocusedInput(null);
	};

	const handleCheckboxChange = () => {
		setShowCoverLine(!showCoverLine);
	};

	return (
		<Container>
			<Row>
				<Col md={6}>
					<Form>
						<Form.Group controlId="selectSkill" className="formSelect">
							<Row>
								<Col>
									<Form.Label>Sélectionner une compétence</Form.Label>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Control
										as="select"
										value={selectedSkill}
										onChange={handleSkillChange}
									>
										{data.map((skill) => (
											<option key={skill.name} value={skill.name}>
												{skill.name}
											</option>
										))}
									</Form.Control>
								</Col>
							</Row>
						</Form.Group>
					</Form>
				</Col>

				<Col md={3}>
					<Form>
						<Form.Group controlId="startDate">
							<Row>
								<Col>
									<Form.Label>Date de début</Form.Label>
								</Col>
							</Row>
							<Row>
								<Col>
									<DatePicker
										selected={startDate}
										onChange={handleStartDateChange}
										onFocus={() => setFocusedInput("startDate")}
										open={focusedInput === "startDate"}
										placeholderText={minUpdatesDate.split(" ")[0]}
										className="form-control"
										dateFormat="dd/MM/yyyy"
									/>
								</Col>
							</Row>
						</Form.Group>
					</Form>
				</Col>
				<Col md={3}>
					<Form>
						<Form.Group controlId="endDate">
							<Row>
								<Col>
									<Form.Label>Date de fin</Form.Label>
								</Col>
							</Row>
							<Row>
								<Col>
									<DatePicker
										selected={endDate}
										onChange={handleEndDateChange}
										onFocus={() => setFocusedInput("endDate")}
										open={focusedInput === "endDate"}
										placeholderText={maxUpdatesDate.split(" ")[0]}
										className="form-control"
										dateFormat="dd/MM/yyyy"
									/>
								</Col>
							</Row>
						</Form.Group>
					</Form>
				</Col>

				<Col md={12}>
					<div className="mt-2 mb-2">
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										defaultChecked={showCoverLine}
										onChange={handleCheckboxChange}
									/>
								}
								label="Couverture"
								style={{ fontSize: "0.8rem" }}
							/>
						</FormGroup>
					</div>
					{data.length > 0 && (
						<Line
							data={formatedDataForChart}
							options={options}
							width={600}
							height={100}
						></Line>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default MultiLineGraph;
