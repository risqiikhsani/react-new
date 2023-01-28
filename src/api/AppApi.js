import instance from "./instance";

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

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

  deleteComment(id){
    return instance.delete(`/app/comment/${id}`);
  }

  deleteReply(id){
    return instance.delete(`/app/reply/${id}`);
  }


  editPost(id,data){
    return instance.put(`/app/post/${id}`, JSON.stringify(data));
  }

  editComment(id,data){
    return instance.put(`/app/comment/${id}`, JSON.stringify(data));
  }

  editReply(id,data){
    return instance.put(`/app/reply/${id}`, JSON.stringify(data));
  }

  createPost(data) {
    return instance.post("/app/posts", data, config);
  }

  createComment(post_id,data){
    return instance.post(`/app/post/${post_id}/comments`,JSON.stringify(data));
  }

  createReply(comment_id,data){
    return instance.post(`/app/comment/${comment_id}/replies`,JSON.stringify(data));
  }

  likePost(id){
    return instance.get(`/app/post/${id}/likehandler`);
  }

  likeComment(id){
    return instance.get(`/app/comment/${id}/likehandler`);
  }

  likeReply(id){
    return instance.get(`/app/reply/${id}/likehandler`);
  }

  savePost(id){
    return instance.get(`/app/post/${id}/savehandler`);
  }



  fetchCommentList(post_id,last_string){
    return instance.get(`/app/post/${post_id}/comments${last_string}`);
  }  

  fetchReplyList(comment_id,last_string){
    return instance.get(`/app/comment/${comment_id}/replies${last_string}`);
  }  

}

export default new AppApi();
