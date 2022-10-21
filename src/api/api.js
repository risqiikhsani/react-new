import instance from "./instance";

export default class api {
  fetchPostList() {
    return instance.get("post-list/");
  }

  createPost(data) {
    return instance.post("post-list/", JSON.stringify(data));
  }
}
