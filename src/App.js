import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidenav from "./Components/NavBar/Sidenav";
import Dashboard1 from "./Pages/Dashboard1";
import Dashboard2 from "./Pages/Dashboard2";
import PageParameters from "./Pages/PageParameters";
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
					<Route path="/" element={<Dashboard2 data={data} />} />
					<Route path="/dashboard2" element={<Dashboard1 data={data} />} />
					<Route path="/personnaliser" element={<PageParameters />} />
				</Routes>
			</main>
			</>}
		</div>
	);
}

export default App;
