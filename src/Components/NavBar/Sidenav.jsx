// Sidenav.js
import styles from "./sidenav.module.css";
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PersonIcon from "@mui/icons-material/Person";
import { navData } from "../../Lib/navData";
import { useState } from "react";
import AppLogo from "../../Logo.png";

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

			{/* Logo */}
			<div className={styles.logoContainer}>
				<img src={AppLogo} alt="Logo" className={styles.logo} />
				{open && (
					<span className={styles.logoTitle}>
						TeaTime - projet 5A
					</span>
				)}
			</div>

			{/* Accès rapide section */}
			{open && <div className={styles.sectionTitle}>Visualisation</div>}
			{navData.slice(0, 2).map((item) => (
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
