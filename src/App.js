import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidenav from "./Components/Sidenav/Sidenav";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Customisation from "./Pages/Customisation/Customisation";
import { fetchData } from "./Services/FetchDataService";

function App() {

	const [data, setData] = useState(null);

	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDataAsync = async () => {
			try {
				const result = await fetchData();
				setData(result);
			} catch (error) {
				console.error("error", error);
				setError(error);
			}
		};

		fetchDataAsync();
	}, []);

	return (
		<div className="App">
			{!data && !error && <div>Loading...</div>}
			{error && <div>Error: {error.message}</div>}
			{data && <>
				<Sidenav />
				<main className="w-100 flex-grow">
					<Routes>
						<Route path="/" element={<Dashboard data={data} />} />
						<Route path="/perso" element={<Customisation />} />
					</Routes>
				</main>
			</>}
		</div>
	);
}

export default App;
