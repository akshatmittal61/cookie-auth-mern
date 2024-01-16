import axios from "axios";
import { backendBaseUrl } from "../constants/variables";

export const http = axios.create({
	baseURL: backendBaseUrl,
});
