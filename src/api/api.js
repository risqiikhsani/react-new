import instance from "./instance";

class Api {
  fetchPostList() {
    return instance.get("post-list/");
  }

  createPost(data) {
    return instance.post("post-list/", JSON.stringify(data));
  }
}

export default new Api();
