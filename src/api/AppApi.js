import instance from "./instance";

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

class AppApi {

  post(){
    function create(data) {
      return instance.post("/app/posts", data, config);
    }

    function get_list(last_string) {
      return instance.get(`/app/posts${last_string}`);
    }

    function get_detail(id){
      return instance.get(`/app/post/${id}`);
    }

    function update(id,data){
      return instance.put(`/app/post/${id}`, data, config);
    }

    function del(id){
      return instance.delete(`/app/post/${id}`);
    }

    

    return {
      create,
      get_list,
      get_detail,
      update,
      del,
    }
  }

  comment(){

    function create(post_id,data){
      return instance.post(`/app/post/${post_id}/comments`,JSON.stringify(data));
    }

    function get_list(post_id,last_string){
      return instance.get(`/app/post/${post_id}/comments${last_string}`);
    }

    function update(id,data){
      return instance.put(`/app/comment/${id}`, JSON.stringify(data));
    }

    function del(id){
      return instance.delete(`/app/comment/${id}`);
    }  

    return {
      create,
      get_list,
      update,
      del,
    }
  }

  reply(){
    function create(comment_id,data){
      return instance.post(`/app/comment/${comment_id}/replies`,JSON.stringify(data));
    }

    function get_list(comment_id,last_string){
      return instance.get(`/app/comment/${comment_id}/replies${last_string}`);
    }  

    function update(id,data){
      return instance.put(`/app/reply/${id}`, JSON.stringify(data));
    }

    function del(id){
      return instance.delete(`/app/reply/${id}`);
    }


    return{
      create,
      get_list,
      update,
      del,
    }
  }

  like(){
    function post_likehandler(id){
      return instance.get(`/app/post/${id}/likehandler`);
    }
  
    function comment_likehandler(id){
      return instance.get(`/app/comment/${id}/likehandler`);
    }
  
    function reply_likehandler(id){
      return instance.get(`/app/reply/${id}/likehandler`);
    }

    return{
      post_likehandler,
      comment_likehandler,
      reply_likehandler,
    }
  }

  save(){
    function post_savehandler(id){
      return instance.get(`/app/post/${id}/savehandler`);
    }

    return{
      post_savehandler,
    }
  }

  user(){
    function get_detail(id){
      return instance.get(`/user-detail/${id}`);
    }
  
    function get_list(){
      return instance.get(`/user-list`);
    }

    return{
      get_list,
      get_detail,
    }
  }
  
  mine(){
    function updateUser(data){
      return instance.put(`/my/user`, data, config);
    }

    function updateProfile(data){
      return instance.put(`/my/profile`, data, config);
    }

    return {
      updateUser,
      updateProfile,
    }
  }

  // updateUser(data){
  //   return instance.put(`/my/user`, data, config);
  // }
  

  // updateProfile(data){
  //   return instance.put(`/my/profile`, data, config);
  // }




}

export default new AppApi();
