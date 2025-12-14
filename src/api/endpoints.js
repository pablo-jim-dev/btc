import axios from "./axios";

export const register = (user) => axios.post("/auth/register", user);
export const results = (sandbox) => axios.get(`/scores/${sandbox}`);