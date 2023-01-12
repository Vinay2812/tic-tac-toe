import { API } from "./AxiosInstance"

export const register = async (formData) => await API.post("/auth/register", formData);
export const login = async(formData) => await API.post("/auth/login", formData);
