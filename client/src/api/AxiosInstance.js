import axios from "axios"
export const API = axios.create({baseURL: process.env.REACT_APP_AXIOS_BASE_URL || "http://localhost:5000"});
