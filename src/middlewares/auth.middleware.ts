import { NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const auth = (req: any, res: any, next: NextFunction) => {
  // get token from front
  const token = req.header("auth-token");

  // have token ?
  if (!token) {
    return res.status(401).send("access denied");
  }

  // verify valid token
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(400).send("invalid token");
  }
};