const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const { readdirSync } = require("fs");
const path = require('path');
const fs = require('fs');
import { connectDatabase } from "./configs/connectDatabase";

const app = express();

connectDatabase();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

readdirSync(path.resolve(__dirname, './routes')).map((r: any) => app.use("/api", require("./routes/" + r)));

app.listen(process.env.PORT, () => {
  console.log("Server listening port " + process.env.PORT);
});