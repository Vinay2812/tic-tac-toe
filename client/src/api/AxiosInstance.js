import axios from "axios"
export const API = axios.create({baseURL: "http://localhost:5000"});
// export const API = axios.create({baseURL: "https://tic-tac-toe-ubgb.onrender.com"});
// export const API = axios.create({baseURL: "https://tic-tac-toe-by-vinay.vercel.app/"});
