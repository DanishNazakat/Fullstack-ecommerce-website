const mongoose = require("mongoose");

require("dotenv").config();

const dbConnection =async()=>{
    try{

        const db = await mongoose.connect(`mongodb+srv://danishnazakat:${process.env.DB_PASS}@cluster0.rpvrbpd.mongodb.net/?appName=Cluster0`)
        .then(()=>{
            console.log("Database Connected Successfuly");
        }).catch((err)=>{
            `error to connectiong mongodb ${err}`
        })

    } catch(err){
        console.log(`error to connectiong mongodb ${err}`)
    }
}


module.exports = dbConnection ;