const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required : true
    },
    lname:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    role:{
        type:String,
        default: "user"
    }

})

const  User = mongoose.model("EcoUser", userSchema);

module.exports = User;