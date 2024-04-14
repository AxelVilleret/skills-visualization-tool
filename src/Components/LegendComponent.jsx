import React from "react";

const Legend = ({ colorScale, titles }) => {
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
