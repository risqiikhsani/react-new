import axios from "axios";
import localStorageApi from "./localStorageApi";
import { auth_api } from "./AuthApi";
import { clearUser } from "../hooks/slices/userSlice";


const BASE_URL = "http://127.0.0.1:8000/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let store

export const injectStore = _store => {
  store = _store
}

// request interceptors
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    
    console.log("AXIOS INTERCEPTORS IS RUNNING ~~~~~~ before request sent, url = "+config.url);
    const token = localStorageApi.getAccessToken();
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.headers["x-access-token"] = token; // for Node.js Express back-end
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("AXIOS INTERCEPTORS IS RUNNING ~~~~~~~~ request error");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await auth_api.refresh_access_token();
          console.log("stage 1 running")
          const { access } = rs.data;
          localStorageApi.updateAccessToken(access);
          instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

          return instance(originalConfig);
        } catch (_error) {
          console.log("stage 2 running")
          localStorageApi.removeUser();
          store.dispatch(clearUser())
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

// // response interceptors
// instance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async (err) => {
//     console.log("interceptor response error is running");
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error

//     // Access token was expired
//     const originalConfig = err.config;
//     if (err.response) {


//       if (err.response.status === 401 && !originalConfig._retry) {
//         console.log("interceptor update access_token by refresh_token is running");
//         originalConfig._retry = true;
//         const result = await AuthApi.refreshAccessToken();
//         console.log("stage 1 running")
//         if(result.data.access==null){
//           console.log("stage 2 running")
//           localStorageApi.removeUser();
//           store.dispatch(clearUser())
//         }
//         console.log("stage 3 running")
//         localStorageApi.updateAccessToken(result?.data.access);
//         instance.defaults.headers["Authorization"] = `Bearer ${result?.data.access}`;
//         return instance(originalConfig);
//         // try {
//         //   const result = await AuthApi.refreshAccessToken(refresh);
//         //   console.log("stage 1 running")
//         //   // const result = await 
//         //   if (result?.data.access) {
//         //     console.log("stage 2 runniing")
//         //     //update access token in localstorage
//         //     localStorageApi.updateAccessToken(result?.data.access);
//         //     //update config headers
//         //     instance.defaults.headers["Authorization"] = `Bearer ${result?.data.access}`;
//         //     return instance(originalConfig);
//         //   }
//         //   console.log("something went wrong")
//         // } catch (_error) {
//         //   console.log("stage 3 running")
//         //   console.log(_error)
//         //   if (_error.response && _error.response.data) {
//         //     console.log("stage 4 running")
//         //     //remove user in localstorage
//         //     localStorageApi.removeUser();
//         //     //remove redux state user to re login
//         //     store.dispatch(clearUser())
//         //     return Promise.reject(_error.response.data);
//         //   }

//           // return Promise.reject(_error);
      
//       }

        
//     }
    
//     return Promise.reject(err);
//   }
// );

export default instance;
