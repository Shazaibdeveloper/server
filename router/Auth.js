const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser'); // Require the body-parser module
router.use(bodyParser.json()); // Use the JSON parser
const bycript = require('bcryptjs') 

require("../db/Conn")
 const User = require("../models/UserSchema")

router.get('/', function (req, res) {
    res.send("Hello Worldsss !");
});

router.get('/register', function (req, res) {
    res.send("Hello register !");
});

router.get('/contact', function (req, res) {
     res.send("Hello contact!");
});

  
router.post('/register', async function (req, res) {
    const { name, work, email, password, cpassword, number } = req.body;
    if(!name|| !work|| !email|| !password|| !cpassword|| !number){
        return res.status(422).json({ message: "Enter correct Data !" });
    }

    try {
        const user = new User({ name, email, work, number, password, cpassword });
        await user.save();
        return res.status(201).json({ message: "user registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "database error", message: err.message });
    }
});

 
router.post('/signin',async function (req, res) {
    
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "register error" });
        }

        const userExists = await User.findOne({ email: email });

        if(userExists){
         const isMatch = await bycript.compare(password, userExists.password)
         const token = await userExists.generateAuthToken();


         res.cookie('jwtoken',token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
         })

         if(isMatch){
            return res.status(400).json({ message: "Invalid" });
         }else{
            res.json({message: "You have Registered successful"})
         }
        }
        console.error(userExists);
 
    }catch(err){console.log("error" , err)}
})



module.exports = router;