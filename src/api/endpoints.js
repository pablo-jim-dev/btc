import axios from "./axios";
const MODE = import.meta.env.MODE;
const API_MODE = MODE === "development" ? "0" : "1";

export const register = (user) => axios.post("/auth/register", user);
export const results = (sandbox) => axios.get(`/scores/${sandbox}`);
export const deleteUsers = (password) =>
  axios.delete(`/scores/${API_MODE}/winners/last`, {
    headers: {
      "x-admin-password": password,
    },
  });
