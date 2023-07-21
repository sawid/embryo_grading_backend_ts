import { createData, getEmbryoList, getProfessorList, imageIdIsValid, matchData } from "../controllers/ocr.controller";
import { auth } from "../middlewares/auth.middleware";

const express = require("express");
const router = express.Router();

router.post('/data/dataisvalid/:imageId', auth, imageIdIsValid);

router.post('/data/match', auth, matchData);

router.post('/data/create', auth, createData);

router.get('/data/get-professor-list', auth, getProfessorList);

router.get('/data/search', auth, getEmbryoList);

module.exports = router;