import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/indexdb.js";
import md from "./middleware/log.js";



dotenv.config({
    path: "./.env"
})

app.use(md);

const PORT = process.env.PORT || 4000;


connectDB();


app.listen(PORT, () => {
    console.log(`Sever up on port: ${PORT}`)
});


