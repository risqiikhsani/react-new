
import instance from "./instance";
import localStorageApi from "./localStorageApi";

class AuthApi {
  login(data) {
    console.log("login api is running ... ")
    return instance.post("/login/", JSON.stringify(data));
  }

  // logout() {
  //   localStorageAPI.removeUser();
  // }

  signup(data) {
    console.log("signup api is running ... ")
    return instance.post("/signup/", JSON.stringify(data));
  }

  refreshAccessToken(){
    caches.log("refresh acess token api is running")
    return instance.post("/token-refresh/",JSON.stringify(localStorageApi.getRefreshToken()))

  }

}

export default new AuthApi();