import { io } from "socket.io-client";

export const getSocket = () =>{
    const socket = io("https://tic-tac-toe-by-vinay2812.vercel.app");
    return socket;
}