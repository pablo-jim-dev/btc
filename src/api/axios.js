import axios from "axios";

const instance = axios.create({
    baseURL: "https://pinatabackend.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;