import PropTypes from "prop-types";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	SvgIcon,
} from "@mui/material";
// import { alpha, useTheme } from '@mui/material/styles';
import MultiLines from "./MultiLines";

import "./style.css";

export const MultiLineGraphCard = ({
	setSelectedDate,
	selectedSkil,
	setSelectedSkil,
	...props
}) => {
	const { chartSeries, sx } = props;

	return (
		<Card sx={sx} className="card-shadow">
			<CardContent>
				<MultiLines
					setSelectedDate={setSelectedDate}
					selectedSkil={selectedSkil}
					setSelectedSkil={setSelectedSkil}
				/>
			</CardContent>
			<Divider />
			{/* <CardActions sx={{ justifyContent: "flex-end" }}>
				<Button
					color="inherit"
					endIcon={
						<SvgIcon fontSize="small">
							<KeyboardDoubleArrowRightIcon />
						</SvgIcon>
					}
					size="small"
				>
					Overview
				</Button>
			</CardActions> */}
		</Card>
	);
};

MultiLineGraphCard.protoTypes = {
	chartSeries: PropTypes.array.isRequired,
	sx: PropTypes.object,
};
