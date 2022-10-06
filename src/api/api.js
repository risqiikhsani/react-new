import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";



const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status == 401) {
      window.location.href = `https://example.com/login`;
    }
    console.error(`Looks like there was a problem. Status Code: ` + res.status);
    return Promise.reject(error);
  }
);

export function fetchPosts() {
  return axiosClient.get(`/post-list`);
}

export function addProduct(data) {
  return axiosClient.post("/product", JSON.stringify(data));
}


