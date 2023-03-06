const express = require("express");
const router = express.Router();

import { registerUser, testHello } from '../controllers/auth.controller'

// router home
router.get('/', testHello);

// Register
router.post('/reg', registerUser);


module.exports = router;