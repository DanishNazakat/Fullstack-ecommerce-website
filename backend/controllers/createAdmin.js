const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const createAdmin = async (req,res) => {
    try {
        const existingAdmin = await User.findOne({ role: "manager" });

        if (existingAdmin) {
            console.log("Manager already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin", 10);

        await User.create({
            fname: "Project",
            lname: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });
        res.status(200).json({
            message : "Admin Successfully created"
        })
        console.log("Manager Created Successfully");

    } catch (error) {
        res.status(400).json({
            message : "Admin not created"
        })
        console.log(error);
    }
};

module.exports = createAdmin;