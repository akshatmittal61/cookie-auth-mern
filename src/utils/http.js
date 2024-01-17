import axios from "axios";
import { backendBaseUrl } from "../constants/variables";

// axios.defaults.withCredentials = true;
export const http = axios.create({
	baseURL: backendBaseUrl,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// Function to set a cookie
export const setCookie = (name, value, options = {}) => {
	let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
		value
	)}`;

	// Set additional options
	Object.entries(options).forEach(([key, value]) => {
		cookieString += `; ${key}`;
		if (value !== true) {
			cookieString += `=${value}`;
		}
	});

	// Set the cookie
	document.cookie = cookieString;
};
