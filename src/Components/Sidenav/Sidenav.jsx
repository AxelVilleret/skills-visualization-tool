// Sidenav.js
import styles from "./sidenav.module.css";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const navData = [
	{
		id: 1,
		icon: <BarChartIcon />,
		text: "Dashboard",
		link: "/",
	},
	{
		id: 2,
		icon: <SettingsIcon />,
		text: "Personnaliser",
		link: "/perso",
	},
];

export default function Sidenav() {
	const [open, setopen] = useState(true);

	const toggleOpen = () => {
		setopen(!open);
	};

	return (
		<div className={open ? styles.sidenav : styles.sidenavClosed}>
			<button className={styles.menuBtn} onClick={toggleOpen}>
				{open ? (
					<KeyboardDoubleArrowLeftIcon />
				) : (
					<KeyboardDoubleArrowRightIcon />
				)}
			</button>

			{/* Accès rapide section */}
			{open && <div className={styles.sectionTitle}>Visualization</div>}
			{navData.slice(0, 1).map((item) => (
				<NavLink
					key={item.id}
					className={styles.sideitem}
					to={item.link}
				>
					{item.icon}
					<span className={styles.linkText}>{item.text}</span>
				</NavLink>
			))}

			{/* Profile link */}
			{open && <div className={styles.sectionTitle}>Profil</div>}
			{navData.slice(-1).map((item) => (
				<NavLink
					key={item.id}
					className={styles.sideitem}
					to={item.link}
				>
					<PersonIcon />
					<span className={styles.linkText}>{item.text}</span>
				</NavLink>
			))}
		</div>
	);
}
