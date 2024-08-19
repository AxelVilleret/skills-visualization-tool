import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";

function CustomBreadcrumbs({ breadcrumbs }) {
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
			className="my-3"
			separator="-"
		>
			{breadcrumbs.map((breadcrumb) => (
				<StyledBreadcrumb
					component="a"
					href="#"
					label={breadcrumb.label}
					icon={breadcrumb.icon}
					className="breadcrumb-item" 
				/>
			))}
		</Breadcrumbs>
	);

}

export default CustomBreadcrumbs;
