import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const todoSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true
    },

    subscription: {
        type: String,
        enum: ['none', 'daily', 'weekily', 'monthiy'],
        default: 'none'

    },
    privarty: {
        type: String,
        required: true
    }
    
});

const todo = mongoose.model("todo", todoSchema);

export default todo;