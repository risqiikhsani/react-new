import axios from "axios";


import localStorageAPI from "./localStorage";



const BASE_URL = "http://127.0.0.1:8000/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// request interceptors
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorageAPI.getAccessToken();
  if(token){
    config.headers["Authorization"] = 'Bearer ' + token;
    // config.headers["x-access-token"] = token; // for Node.js Express back-end
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// response interceptors
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
},
async (err) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // Access token was expired
  const originalConfig = err.config;
  if(originalConfig.url !== "/login" && err.response){
    if(err.response.status === 401 && !originalConfig._retry){
      originalConfig._retry = true;
      try{
        const rs = await instance.post("/token-refresh",{
          refresh_token: localStorageAPI.getRefreshToken();
        })
        const {access_token} = rs.data;
        localStorageAPI.updateAccessToken(accessToken);
        return instance(originalConfig);
      }catch(_error){
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
});



export default instance;