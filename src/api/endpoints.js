import axios from "./axios";

export const register = (user) => axios.post("/auth/register", user);
export const results = (sandbox, event) => axios.get(`/scores/${sandbox}/event/${event}`);