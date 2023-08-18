 const jwt = require('jsonwebtoken');
const user = require('../models/UserSchema')
  

const Authentication = async (req, res, next) => {
    try {
      const token = req.cookies.jwtoken;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const validToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({ _id: validToken._id, tokens: { $elemMatch: { token } } });
  
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