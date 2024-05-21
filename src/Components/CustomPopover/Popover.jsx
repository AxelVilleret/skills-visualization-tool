import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { KeyOutlined } from "@mui/icons-material";

export default function CustomPopover({ children }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<div className="mt-5">
			<div
				onClick={handleClick}
				style={{
					cursor: "pointer",
					borderRadius: "50%",
					border: "3px solid #1976d2",
					padding: "5px",
				}}
			>
				<KeyOutlined color="primary" />
			</div>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				{children}
			</Popover>
		</div>
	);
}
