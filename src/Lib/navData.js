import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

export const navData = [
	{
		id: 0,
		icon: <HomeIcon />,
		text: "Par compétence",
		link: "dashboard2",
	},
	{
		id: 1,
		icon: <BarChartIcon />,
		text: "Par ensemble",
		link: "/",
	},
	{
		id: 2,
		icon: <SettingsIcon />,
		text: "Personnaliser",
		link: "personnaliser",
	},
];
