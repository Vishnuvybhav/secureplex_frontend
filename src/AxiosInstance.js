// axiosInstance.js
import axios from "axios";

// Create an axios instance
const baseHost = window.location.host.split(':')[0];
print("baseHost",baseHost)
let subdomain = ""
if(baseHost == "localhost"){
  subdomain = ""
}
else{
subdomain = baseHost.split('.')[0]
}

let baseURL = ""
console.log("process.env.REACT_APP_ENVIRONMENT",process.env.REACT_APP_ENVIRONMENT)
if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  // Production environment: Use the Azure-provided domain and handle subdomain if any
  if (subdomain && subdomain !== 'www') {
    // If there's a subdomain, build the base URL with the subdomain
    baseURL = `https://${subdomain}.attackboxwebapp-cpenccbyfta0atdg.southeastasia-01.azurewebsites.net/api/v1`;
  } else {
    // No subdomain, use the default production URL
    baseURL = `https://attackboxwebapp-cpenccbyfta0atdg.southeastasia-01.azurewebsites.net/api/v1`;
  }
} else {
  baseURL = baseHost
  ? `${window.location.protocol}//${baseHost}:8000/api/v1` // Use dynamic host and port 8000
  : `http://localhost:8000/api/v1` // Fallback to localhost if baseHost is empty or undefined
}
 // Gets the domain without port
console.log(baseHost,"baseHost");
const axiosInstance = axios.create({
  baseURL: baseURL,
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
