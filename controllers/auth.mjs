import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.mjs";
import { RESPONSE_MESSAGES } from "../constants/enums.mjs";
import { jwtSecret } from "../config/index.mjs";

export const verify = async (req, res) => {
	try {
		console.log(req.cookies, req.headers.cookie);
		const token = req.cookies.token;
		console.log(token);
		if (!token) {
			return res
				.status(401)
				.json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
		}
		const decoded = jwt.verify(token, jwtSecret);
		console.log(decoded);
		const foundUser = await User.findById(decoded.id);
		console.log(foundUser);
		if (!foundUser) {
			return res
				.status(404)
				.json({ message: RESPONSE_MESSAGES.NOT_FOUND });
		}
		return res
			.status(200)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: foundUser });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
		}
		const foundEmail = await User.findOne({ email });
		if (foundEmail) {
			return res
				.status(409)
				.json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		return res
			.status(201)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: user });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
		}
		const foundUser = await User.findOne({ email });
		if (!foundUser) {
			return res
				.status(404)
				.json({ message: RESPONSE_MESSAGES.NOT_FOUND });
		}
		console.log(foundUser);
		const isPasswordCorrect = await bcrypt.compare(
			password,
			foundUser.password
		);
		if (!isPasswordCorrect) {
			return res
				.status(401)
				.json({ message: RESPONSE_MESSAGES.BAD_REQUEST });
		}
		const token = jwt.sign({ id: foundUser._id }, jwtSecret, {
			expiresIn: "30d",
		});
		/* res.cookie("token", token, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
        }); */
		console.log(token, res);
		return res
			.cookie("token", token, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				sameSite: "none",
				secure: true,
			})
			.status(200)
			.json({ message: RESPONSE_MESSAGES.SUCCESS, data: foundUser });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
	}
};
