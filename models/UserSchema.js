const mongoose = require('mongoose')
const bycript = require('bcryptjs') 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
}) 

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bycript.hash(this.password, 12);
        this.cpassword = await bycript.hash(this.cpassword, 12);
    }
    next();
})

UserSchema.methods.generateAuthToken = async function(){
    try{
      let token = jwt.sign({_id: this._id},process.env.SECRETE_KEY);
      this.tokens = this.tokens.concat({token: token});
      await this.save();
      return token;
    }catch(err){console.log(err)}
}

const User = mongoose.model('USER',UserSchema)

module.exports = User;




