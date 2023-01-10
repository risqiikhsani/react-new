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

  likePost(id){
    return instance.get(`/app/post/${id}/likehandler`);
  }

  savePost(id){
    return instance.get(`/app/post/${id}/savehandler`);
  }

  createComment(post_id,data){
    return instance.post(`/app/post/${post_id}/comments`,JSON.stringify(data));
  }

  fetchCommentList(post_id,last_string){
    return instance.get(`/app/post/${post_id}/comments${last_string}`);
  }  

}

export default new AppApi();
