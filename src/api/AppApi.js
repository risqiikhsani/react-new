import instance from "./instance";

class AppApi {
  fetchPostList() {
    return instance.get("/app/post-list/");
  }

  createPost(data) {
    return instance.post("/app/post-list/", JSON.stringify(data));
  }
}

export default new AppApi();
