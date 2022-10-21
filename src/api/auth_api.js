
import localStorageAPI from "./localStorage";
import instance from "./instance";


export default class AuthApi{
  login(data){
    return instance.post('login/', JSON.stringify(data))
  }

  logout(){
    localStorageAPI.removeUser()
  }

  signup(data){
    return instance.post('signup/',JSON.stringify(data))
  }
}




