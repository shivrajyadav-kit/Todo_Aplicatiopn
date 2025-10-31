import express from "express";
import todo from "./routes/user.route.js";
import  User  from "./routes/userlogin.js";
import cors from "cors"

const app = express();

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}));
app.use(express.json());

app.use("/api/v1/todo", todo);
app.use("/api/v1/users",User);


export default app;
