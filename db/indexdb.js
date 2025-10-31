import mongoose  from "mongoose";
import dotenv from "dotenv"
console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try {

        mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb is connected ")
        
    } catch (error) {
        console.log("Mongodb not connected ",error)
        
    }
}

export default connectDB;