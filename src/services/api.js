import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, //  Ensure this is correct
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Retrieve token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // Attach token
  }
  return req;
});

export default API;
