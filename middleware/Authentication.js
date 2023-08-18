 const jwt = require('jsonwebtoken');
const user = require('../models/UserSchema')
  

const Authentication = async (req,res,next) => {
  try{
        const token = req.cookies.jwtoken;
       const validToken = jwt.verify(token,process.env.SECRET_KEY);
       const rootUser = await user.findOne({_id: validToken._id,"tokens:token": token})
       if(!rootUser){
        throw new Error('user not found')
       }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();


  }catch(err){
    res.status(400).send('Unauthorized');
    console.log(err);
  }
}

module.exports = Authentication