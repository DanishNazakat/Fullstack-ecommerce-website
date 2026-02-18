
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const signup = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        if (!fname || !lname || !email || !password) {
            return res.send({
                message: "all Fields required",
                status: 400
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send({
                message: "User already Exist ",
                status: 400
            })

        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        const user = {
            fname, lname, email, password: hashed
        }
        const newUser = await new User(user).save();

        res.send({
            status: 200,
            messege: "successfully signup"
        })
    } catch (err) {
        ;
        res.send({
            massage: "Sorry server not respnding",
            status: 500,
            err
        })
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                massage: "All Fields required",
                status: 400
            })
        }

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(404).json({
                message: "Invalid Email or Password"
            })
        }
        let result = await bcrypt.compare(password, userData.password)
        if (!result) {
            return res.status(404).json({
                message: "Invalid Email or Password"
            })
        }
        const token = jwt.sign(
            { id: userData._id, email: userData.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        console.log("this is Token value " + token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true sirf https me
            maxAge: 24 * 60 * 60 * 1000
        });
        // const token = jwt.sign(
        //     { id: userData._id },
        //     process.env.JWT_SECRET,
        //     {expiresIn: '1h'}
        // );
        // console.log("Generated Token:", token);
        // res.cookie("token", token, {
        //     httpOnly: true,          // JS access nahi kar sakta
        //     secure: false,           // production me true karna (HTTPS)
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });
        //   console.log("Cookie Sent:", res.getHeader("Set-Cookie"));
        return res.status(200).json({
            message: "login Successfully",
            user: {
                name: userData.fname,
                email: userData.email
            }
        })

    } catch (err) {
        res.send({
            massage: "server internal Error",
            error: err.message
        })
    }
}
module.exports = { signup, login };