
import instance from "./instance";


export default class api{
  fetchPosts(){
    return instance.get('post-list/')
  }

  addPost(data){
    return instance.post('post-list/',JSON.stringify(data))
  }
}
