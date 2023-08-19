 const jwt = require('jsonwebtoken');
const user = require('../models/UserSchema')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const Authentication = async (req, res, next) => {
    try {
      const token = req.cookies.jwtoken;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized token' });
      }
      const SECRET_KEY = process.env.SECRET_KEY;
      const validToken = jwt.verify(token, SECRET_KEY);
      const rootUser = await user.findOne({ _id: validToken._id, "tokens:token": token  });
  
      if (!rootUser) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = Authentication