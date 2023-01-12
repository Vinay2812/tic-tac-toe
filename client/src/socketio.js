import { io } from "socket.io-client";

export const getSocket = () =>{
    const socket = io(process.env.REACT_APP_AXIOS_BASE_URL);
    return socket;
}