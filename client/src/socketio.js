import { io } from "socket.io-client";

export const getSocket = () =>{
    const socket = io("https://tic-tac-toe-ubgb.onrender.com");
    return socket;
}