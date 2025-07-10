import axios from "axios";

// Base URL of your backend server
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if you deployed backend
});

// Attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
