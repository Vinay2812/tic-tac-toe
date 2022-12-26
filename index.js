import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import * as path from 'path';
import AuthRoute from "./routes/AuthRoute.js"
import GameRoute from "./routes/GameRoute.js"
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000", "https://tic-tac-toe-xzd7.onrender.com"]
}));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Database connected");
})

// Routes
app.use("/auth", AuthRoute);
app.use("/game", GameRoute);

if(!process.env.NODE_ENV){
    app.use(express.static(path.join(__dirname, "\\client\\build")));

    app.get("*", (req, res)=>{
        console.log(path.join(__dirname, "\\client\\build", "index.html"));
        res.sendFile(path.join(__dirname, "\\client\\build", "index.html"));
    });
}


app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})