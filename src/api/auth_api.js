import axios from "axios";
import instance from "./instance";


export function login(data) {
  return instance.post(`/login`, JSON.stringify(data));
}

export function logout() {
  return instance.post("/product");
}

export function signup(data){
    return instance.post("/signup", JSON.stringify(data))
}





