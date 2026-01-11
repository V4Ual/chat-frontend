import { config } from "../Config";
import axios from "axios";

console.log(config.API_URL, import.meta.env.VITE_APP_API_URL);
const axiosApi = axios.create({ baseURL: config.API_URL });

axiosApi.interceptors.request.use(
  (config) => {
    console.log(!config.headers["authorization"]);
    // set header with access token if not available

    if (!config.headers["authorization"]) {
      const token = localStorage.getItem("token");
      config.headers["authorization"] = token ? `Bearer ${token}` : "";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here
    if (error?.response?.status === 404) {
      console.log(" ERROR => 404 => API not available");
    } else if (error?.response?.status === 500) {
      console.log(" ERROR => 500 => Server Error");
    } else if (
      error?.response?.status === 401 ||
      error?.response?.status === 498
    ) {
    } else {
      console.log("/other-errors.");
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
