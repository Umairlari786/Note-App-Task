//Connection with db

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true, // Corrected typo here
            useUnifiedTopology: true, // Adding this option for unified topology
        });
        console.log("connected with database");
    }

    catch(err){
        console.error("error:", err.messaage);
        process.exit(1);
    }
}

module.exports = connectDB;