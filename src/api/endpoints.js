import axios from "./axios";

export const register = (user) => axios.post("/results", user);
export const results = (sandbox) => axios.get(`/results/${sandbox}`);