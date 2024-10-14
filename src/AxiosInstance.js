// axiosInstance.js
import axios from "axios";

// Create an axios instance
const baseHost = window.location.host.split(':')[0];
console.log(baseHost,"ooopopoppp")
 // Gets the domain without port

const axiosInstance = axios.create({
  baseURL: baseHost
    ? `${window.location.protocol}//${baseHost}:8000/api/v1` // Use dynamic host and port 8000
    : `http://localhost:8000/api/v1`, // Fallback to localhost if baseHost is empty or undefined
  headers: {
    "Content-Type": "application/json",
  },
  
});

axiosInstance.defaults.withCredentials = true;

// Add interceptor to inject token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
