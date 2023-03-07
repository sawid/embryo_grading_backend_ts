const express = require("express");
const router = express.Router();

import { currentUser, loginUser, registerUser, testHello } from '../controllers/auth.controller'
import { auth } from '../middlewares/auth.middleware';

// router home
router.get('/', testHello);

// router home
router.post('/currentuser', auth, currentUser);

// Register
router.post('/reg', registerUser);

// Login
router.post('/log', loginUser);


module.exports = router;