import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CalendarMonthOutlined } from "@mui/icons-material";

function BreadcrumbsComponent({ breadcrumbs }) {
	const StyledBreadcrumb = styled(Chip)(({ theme }) => {
		const backgroundColor =
			theme.palette.mode === "light"
				? theme.palette.grey[100]
				: theme.palette.grey[800];
		return {
			backgroundColor,
			height: theme.spacing(3),
			color: theme.palette.text.primary,
			fontWeight: theme.typography.fontWeightRegular,
			"&:hover, &:focus": {
				backgroundColor: emphasize(backgroundColor, 0.06),
			},
			"&:active": {
				boxShadow: theme.shadows[1],
				backgroundColor: emphasize(backgroundColor, 0.12),
			},
		};
	});

	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			style={{ marginBottom: "1.2rem", marginTop: "1.2rem" }}
			separator="-"
		>
			{breadcrumbs.map((breadcrumb) => (
				<StyledBreadcrumb
					component="a"
					href="#"
					label={breadcrumb.label}
					icon={breadcrumb.icon}
				/>
			))}
		</Breadcrumbs>
	);
}

export default BreadcrumbsComponent;
