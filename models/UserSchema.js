const mongoose = require('mongoose')
const bycript = require('bcryptjs') 

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
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
    }
}) 

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bycript.hash(this.password, 12);
        this.cpassword = await bycript.hash(this.cpassword, 12);
    }
    next();
})


const User = mongoose.model('USER',UserSchema)

module.exports = User;




