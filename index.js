import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import * as path from 'path';
import AuthRoute from "./routes/AuthRoute.js"
import GameRoute from "./routes/GameRoute.js"
import * as url from 'url';
// import { createServer } from "http"
// import { Server } from "socket.io";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config()
const app = express();
// const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*"
}));

//socket.io set up

// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     },
// });

// io.on('connection', function (socket){
//     // socket.on("connect_error", (err)=>console.log(err))
//     socket.on("join_room", (gameId)=>{
//         socket.join(gameId);
//     })
//     socket.on("update_game", (gameId)=>{
//         console.log("update started");
//         setTimeout(() => {
//             socket.emit("start_game_update");
//         }, 2000);
        
//     })
// });

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB || "mongodb+srv://vinay:brockvs28@cluster0.oldoz.mongodb.net/tic-tac-toe", ()=>{
    console.log("Database connected");
})

// Routes
app.use("/auth", AuthRoute);
app.use("/game", GameRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Listening on port ${process.env.PORT || 5000}`);
})

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});