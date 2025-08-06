require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        if(!process.env.DB_URL){
            return console.log(
                "Database connection failed..",
                process.env.DB_URL
            )
        }
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connection successfull");
    }
    catch(err){
        console.log("Database connection error:", err);
        process.exit(1);
    }
}

module.exports = connectDB;