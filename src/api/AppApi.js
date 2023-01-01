import instance from "./instance";

class AppApi {
  fetchPostList(last_string) {
    return instance.get(`/app/posts${last_string}`);
  }

  createPost(data) {
    return instance.post("/app/posts", JSON.stringify(data));
  }
}

export default new AppApi();
