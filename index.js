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
    origin: "*"
}));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB || "mongodb+srv://vinay:brockvs28@cluster0.oldoz.mongodb.net/tic-tac-toe", ()=>{
    console.log("Database connected");
})

// Routes
app.use("/auth", AuthRoute);
app.use("/game", GameRoute);


app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Listening on port ${process.env.PORT || 5000}`);
})
