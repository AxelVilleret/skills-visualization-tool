import React, { useEffect, useState } from "react";

import "./style.css";

function ColorPalette({ colors, selected, handleSelect, children }) {

    const [isSelected, setIsSelected] = useState(false);

	const style = (color) => ({
		backgroundColor: color,
		width: "65px",
		height: "50px",	
	});

    useEffect(() => {
        const selectedColors = JSON.parse(localStorage.getItem("color-palette"))
        setIsSelected(JSON.stringify(colors) === JSON.stringify(selectedColors))
    }, [selected])

	return (
		<div className="position-relative" style={{ width: "fit-content" }}>
			<div
				className="d-flex color-palette"
				onClick={() => {
					handleSelect(colors, setIsSelected);
				}}
			>
				{colors.map((color) => (
					<div style={style(color)}></div>
				))}
			</div>
            {isSelected && children}
		</div>
	);
}

export default ColorPalette;
