import axios from "axios";

const API = axios.create({
    baseURL:"https://job-portal-x61w.onrender.com/api/v1",
    withCredentials: true
});

export default API;