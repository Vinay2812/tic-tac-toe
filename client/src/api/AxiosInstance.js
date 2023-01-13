import axios from "axios"
const targetURL = "https://tic-tac-toe-by-vinay2812.vercel.app"
export const API = axios.create({baseURL: targetURL});;
