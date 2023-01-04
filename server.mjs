import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./config/index.mjs";

import apiIndex from "./routes/index.mjs";
import connect from "./db/index.mjs";

config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiIndex);

app.listen(PORT, () => {
	connect();
	console.log(`Server started at port ${PORT}`);
});
