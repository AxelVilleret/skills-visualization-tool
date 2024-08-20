import React from "react";
import { LOCAL_STORAGE_KEYS, DEFAULT_COLOR_PALETTE } from '../../constants.js';
import { localStorageService } from '../../Services/LocalStorageService.js';

const Legend = ({ titles }) => {

	const colorScale = localStorageService.getItem(LOCAL_STORAGE_KEYS.COLOR_PALETTE) || DEFAULT_COLOR_PALETTE
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				margin: "1rem",
			}}
		>
			{colorScale.map((color, index) => (
				<div
					key={index}
					style={{ display: "flex", alignItems: "center", margin: "0 10px" }}
				>
					<div
						style={{ width: "20px", height: "20px", backgroundColor: color }}
					></div>
					<div style={{ marginLeft: "5px" }}>{titles[index]}</div>
				</div>
			))}
		</div>
	);
};

export default Legend;
