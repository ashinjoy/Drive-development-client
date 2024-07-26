import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      !config.url.includes("auth/user/login/") ||
      config.url.includes("auth/driver/login/")
    ) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.log("error in request axios interceptor", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken =
        originalRequest.headers["Authorization"].split(" ")[1];
      const decodeToken = jwtDecode(accessToken);
      if (decodeToken.role === "USER") {
        const response = await axiosInstance.get("auth/refresh-token");
        console.log("interceptor response", response.data);
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } else if (decodeToken.role) {
        // console.log("admin");
      } else if (decodeToken.role) {
        // console.log("user");
      } else {
        // console.log("edgeCase");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
