import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils";
import Typography from "../../library/Typography";
import Button from "../../library/Button";
import { AiOutlineArrowRight } from "react-icons/ai";

const classes = stylesConfig(styles, "home");

const Home = () => {
	return (
		<main className={classes("")}>
			<Typography
				type="heading"
				variant="display"
				style={{
					fontSize: "64px",
				}}
			>
				MERN Stack Template ✨
			</Typography>
			<Typography type="heading" variant="subtitle">
				React, Node, Express, MongoDB, Sass, Prettier, ESLint, and more!
			</Typography>
			<Button
				size="large"
				icon={<AiOutlineArrowRight />}
				iconPosition="right"
				onClick={() => {
					window.open("https://akshatmittal61.vercel.app", "_blank");
				}}
			>
				Contact Us
			</Button>
		</main>
	);
};

export default Home;
