const jwt = require("jsonwebtoken");
const user = require("../models/UserSchema");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    const validToken = jwt.verify(token, "MONGODATABASEEXPRESSJAVASCRIPTREACT");

    const rootUser = await user.findOne({
      _id: validToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("Not Found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Internal server error" });
    console.error(err);
  }
};

module.exports = Authentication;
