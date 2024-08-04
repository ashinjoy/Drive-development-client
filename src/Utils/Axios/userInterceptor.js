import axios from "axios";


const getAccessToken = () => {
  return localStorage.getItem("userAccessToken");
};

export const UserPrivate = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

UserPrivate.interceptors.request.use(
  (request) => {
    const userAccessToken = getAccessToken();
    if (userAccessToken) {
      request.headers["Authorization"] = `Bearer ${userAccessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

UserPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    try {
      if (error?.response?.status === 401 && !originalRequest._retry) {
        console.log('entry');
        
        originalRequest._retry = true
        const response = await UserPrivate.get("auth/user/refreshToken");
        const newUserAceessToken = response.data;
        console.log('user',newUserAceessToken);
     localStorage.setItem(
          "userAccessToken",
          newUserAceessToken
        );
        UserPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newUserAceessToken}`;
        return UserPrivate(originalRequest);
      }
    } catch (error) {

    }
    return Promise.reject(error)
  }
);
