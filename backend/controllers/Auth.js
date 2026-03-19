
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
            message: "successfully signup"
        })
    } catch (err) {
        ;
        res.send({
            message: "Sorry server not respnding",
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
                message: "All Fields requireds ",
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
            { id: userData._id, email: userData.email , role : userData.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        console.log("this is Token value " + token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true sirf https me
            sameSite: "lax",
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
                email: userData.email,
                role: userData.role
            }
        })

    } catch (err) {
        res.send({
            message: "server internal Error",
            // error: err.message
        })
    }
}


// 1. Get All Users (Admin ke liye)
const getAllUsers = async (req, res) => {
    try {
        // Hum password nahi bhejenge security ke liye
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Users lane mein dikkat hui", error: error.message });
    }
};

// 2. Update User (Role ya Details badalne ke liye)
const updateUser = async (req, res) => {
    try {
        const { fname, lname, email, role } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { fname, lname, email, role },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User nahi mila" });
        }

        res.status(200).json({ message: "User update ho gaya", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Update fail ho gaya", error: error.message });
    }
};

// 3. Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User pehle hi delete ho chuka hai" });
        }

        res.status(200).json({ message: "User successfully delete ho gaya" });
    } catch (error) {
        res.status(500).json({ message: "Delete karne mein error", error: error.message });
    }
};
module.exports = { signup, login, getAllUsers , updateUser, deleteUser };