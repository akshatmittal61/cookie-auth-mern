import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils/functions";
import Typography from "../../library/Typography";
import Button from "../../library/Button";
import { http } from "../../utils/http";
import { Link } from "react-router-dom";

const classes = stylesConfig(styles, "home");

const Home = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
	});

	const verifyLoggedIn = async () => {
		try {
			const res = await http.get("/auth/verify");
			setUser(res.data);
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	useEffect(() => {
		verifyLoggedIn();
	}, []);

	return (
		<main className={classes("")}>
			<Typography
				type="heading"
				variant="display"
				style={{
					fontSize: "64px",
				}}
			>
				Hola There! ✨
			</Typography>
			<Typography type="heading" variant="subtitle">
				Welcome, {user.name ? user.name.split(" ")[0] : "Guest"}!
			</Typography>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "16px",
					width: "100%",
					marginTop: "2rem",
				}}
			>
				<Link to="/login">
					<Button size="small" iconPosition="right">
						Login
					</Button>
				</Link>
				<Link to="/register">
					<Button size="small" iconPosition="right">
						Register
					</Button>
				</Link>
			</div>
			<Button
				size="large"
				iconPosition="right"
				onClick={() => {
					window.open("https://akshatmittal61.vercel.app", "_blank");
				}}
			>
				Contact The Developer
			</Button>
		</main>
	);
};

export default Home;
