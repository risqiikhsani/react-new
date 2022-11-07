import axios from "axios";
import localStorageApi from "./localStorageApi";
import AuthApi from "./AuthApi";

const BASE_URL = "http://127.0.0.1:8000/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// request interceptors
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("before request sent")
    const token = localStorageApi.getAccessToken();
    console.log(token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    // config.headers["x-access-token"] = token; // for Node.js Express back-end
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request error")
    return Promise.reject(error);
  }
);

// response interceptors
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (err) => {
    console.log("interceptor response error is running")
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Access token was expired
    const originalConfig = err.config;
    if (originalConfig.url !== "/login/" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log("interceptor update access_token by refresh_token is running")
        originalConfig._retry = true;
        const refresh = localStorageApi.getRefreshToken()
        const result = await AuthApi.refreshAccessToken(refresh)
        if(result?.data.access){
          //update access token in localstorage
          localStorageApi.updateAccessToken(result?.access)
          //update config headers
          config.headers["Authorization"] = `Bearer ${result?.access}`
          
        }
        else{
          //remove user in localstorage
          localStorageApi.removeUser()
          //remove redux state user to re login
        }
        
        return instance(originalConfig)
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
