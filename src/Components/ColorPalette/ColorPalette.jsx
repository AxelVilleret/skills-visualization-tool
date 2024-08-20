import React, { useEffect, useState } from "react";

function ColorPalette({ colors, selectedPalette, handleSelect, children }) {

    const [isSelected, setIsSelected] = useState(false);

	const style = (color) => ({
		backgroundColor: color,
		width: "65px",
		height: "50px",	
	});

    useEffect(() => {
        setIsSelected(JSON.stringify(colors) === JSON.stringify(selectedPalette))
    }, [selectedPalette, colors])

	return (
		<div className="position-relative d-inline-block m-3" >
			<div
				className="d-flex d-inline-block p-3 rounded shadow-sm bg-white cursor-pointer"
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
