import { testOCR } from "../controllers/ocr.controller";

const express = require("express");
const router = express.Router();

router.get('/testocr', testOCR);

module.exports = router;