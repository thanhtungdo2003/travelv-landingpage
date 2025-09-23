import axios from "axios";

const api = axios.create({
  baseURL: "https://travelv-fastapi-production.up.railway.app/api",
  timeout: 30000
});

export default api;