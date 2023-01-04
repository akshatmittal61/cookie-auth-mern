import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./config/index.mjs";

import apiIndex from "./routes/index.mjs";
import connect from "./db/index.mjs";

import path from "path";

config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiIndex);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
} // Serve the build files if the app is in production mode

app.listen(PORT, () => {
	connect();
	console.log(`Server started at port ${PORT}`);
});
