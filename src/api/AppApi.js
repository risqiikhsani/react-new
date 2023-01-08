import instance from "./instance";

class AppApi {
  fetchPostList(last_string) {
    return instance.get(`/app/posts${last_string}`);
  }

  fetchPostDetail(id){
    return instance.get(`/app/post/${id}`);
  }

  deletePost(id){
    return instance.delete(`/app/post/${id}`);
  }

  editPost(id,data){
    return instance.put(`/app/post/${id}`, JSON.stringify(data));
  }

  createPost(data) {
    return instance.post("/app/posts", JSON.stringify(data));
  }
}

export default new AppApi();
