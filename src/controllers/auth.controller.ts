const bcrypt = require("bcryptjs");
import { User } from "../schemas/User";
import { validateLogin, validateUser } from "../services/auth.validator";
import { generateAccessToken } from "../services/user.token.services";

// test api
export const testHello = (req: any, res: any): any => {
  // function logic removed for brevity
  return res.send("Gello")
}

// register user
export const registerUser = async (req: any, res: any) => {
  try {
    // check data
    const { error } = await validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // check email is registered?
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).send("user alredy registerd");
    }

    // build user
    user = new User(req.body);

    // encrypt pass
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // create object user
    user = new User({
      username: req.body.username,
      password: user.password,
      isVerify: false,
    })
    
    await user.save();
    
    return res.send("S");
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).send(error.message);
  }
}

// login user
export const loginUser = async (req: any, res: any) => {
  try {
    // check body have email and password (check data)
    const { error } = await validateLogin(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // check email valid
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send("invalid email or password (1)");
    }
    // check password is null form google authen register
    if (user.password === null) {
      return res.status(400).send("must set password first");
    }
    // check password equal to hash
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("invalid email or password (2)");
    }

    // create token
    const token = generateAccessToken(user._id);
    res.send(token);
  } catch (error) {
    console.log(error)
    res.status(500).send("Server Error Code 500");
  }

};