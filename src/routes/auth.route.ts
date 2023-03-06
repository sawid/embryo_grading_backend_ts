const express = require("express");
const router = express.Router();

import { loginUser, registerUser, testHello } from '../controllers/auth.controller'

// router home
router.get('/', testHello);

// Register
router.post('/reg', registerUser);

// Login
router.post('/log', loginUser);


module.exports = router;