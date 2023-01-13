import { io } from "socket.io-client";

export const getSocket = () =>{
    const socket = io("https://tic-tac-toe-by-vinay2812.up.railway.app");
    return socket;
}