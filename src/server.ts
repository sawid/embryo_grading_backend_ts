const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const { readdirSync } = require("fs");
const path = require('path');
const fs = require('fs');
import { connectDatabase } from "./configs/connectDatabase";

const corsOptions = {
  origin: ['https://deb3-2403-6200-88a0-9d27-3cc6-b8f-a140-c644.ngrok-free.app', 'http://localhost:3232', 'http://localhost:3000', 'https://ocr-frontend-f6a21.web.app'], // Add your ngrok URL and any other allowed origins
  optionsSuccessStatus: 200,
};

const app = express();

connectDatabase();

// Replace '../test_image_set' with the path to your folder that you want to serve
const folderToServe = path.join(__dirname, '../test_image_set');

console.log(folderToServe);

// Serve static files from the specified folder
app.use('/files', express.static(folderToServe));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors(corsOptions));

readdirSync(path.resolve(__dirname, './routes')).map((r: any) => app.use("/api", require("./routes/" + r)));

app.listen(process.env.PORT, () => {
  console.log("Server listening port " + process.env.PORT);
});