import { createData, imageIdIsValid, matchData } from "../controllers/ocr.controller";
import { auth } from "../middlewares/auth.middleware";

const express = require("express");
const router = express.Router();

router.get('/data/dataisvalid/:imageId', auth, imageIdIsValid);

router.post('/data/match', auth, matchData);

router.post('/data/create', auth, createData);

module.exports = router;