import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";

import AuthRoute from "./routes/AuthRoute.js"
import GameRoute from "./routes/GameRoute.js"

dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000", "https://tic-tac-toe-by-vinay.vercel.app/"]
}));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Database connected");
})

// Routes
app.use("/auth", AuthRoute);
app.use("/game", GameRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})