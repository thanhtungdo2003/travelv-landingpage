import axios from "axios";

const api = axios.create({
  //baseURL: "https://travelv-fastapi-production.up.railway.app/api",
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 30000
});

export default api;