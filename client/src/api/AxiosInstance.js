import axios from "axios"
const targetURL = "https://tic-tac-toe-by-vinay2812.up.railway.app"
// const targetURL = "http://localhost:5000"
export const API = axios.create({baseURL: targetURL});;
