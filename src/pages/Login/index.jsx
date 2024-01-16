import React, { useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils/functions";
import { http } from "../../utils/http";
import Button from "../../library/Button";
import Input from "../../library/Input";

const classes = stylesConfig(styles, "login");

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const [creds, setCreds] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setCreds({
			...creds,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await http.post("/auth/login", creds);
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className={classes("")}>
			<h1>Login Page</h1>
			<form onSubmit={handleSubmit}>
				<Input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
				/>
				<Input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				<Button loading={loading} type="submit">
					Login
				</Button>
			</form>
		</main>
	);
};

export default LoginPage;
