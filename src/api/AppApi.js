import instance from "./instance";

class AppApi {
  fetchPostList() {
    return instance.get("/app/posts/");
  }

  createPost(data) {
    return instance.post("/app/posts/", JSON.stringify(data));
  }
}

export default new AppApi();
