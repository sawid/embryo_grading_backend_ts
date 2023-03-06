import mongoose from "mongoose";

const jwt = require("jsonwebtoken");

export function generateAccessToken(id: mongoose.Types.ObjectId) {
    // build token
    const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);
    return token;
  }