import axios from "axios";
import instance from "./instance";


export function fetchPosts() {
  return instance.get(`/post-list`);
}

export function addProduct(data) {
  return instance.post("/product", JSON.stringify(data));
}


