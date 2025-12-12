import axios from "axios";
const MODE = import.meta.env.MODE;
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_BASE_URL = MODE === "development" ? VITE_API_URL_LOCAL : VITE_API_URL;


const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;