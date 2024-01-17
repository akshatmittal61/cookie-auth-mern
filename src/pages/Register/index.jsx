import React, { useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils/functions";
import { http } from "../../utils/http";
import Button from "../../library/Button";
import Input from "../../library/Input";

const classes = stylesConfig(styles, "register");

const RegisterPage = () => {
	const [loading, setLoading] = useState(false);
	const [creds, setCreds] = useState({
		name: "",
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
			const { data } = await http.post("/auth/register", creds);
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className={classes("")}>
			<h1>Register Page</h1>
			<form onSubmit={handleSubmit}>
				<Input
					type="text"
					name="name"
					placeholder="Name"
					onChange={handleChange}
				/>
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
					Register
				</Button>
			</form>
		</main>
	);
};

export default RegisterPage;
