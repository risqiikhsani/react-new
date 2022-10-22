import localStorageAPI from "./localStorageApi";
import instance from "./instance";

class AuthApi {
  login(data) {
    console.log("login api is running ... ")
    return instance.post("login/", JSON.stringify(data));
  }

  // logout() {
  //   localStorageAPI.removeUser();
  // }

  signup(data) {
    console.log("signup api is running ... ")
    return instance.post("signup/", JSON.stringify(data));
  }
}

export default new AuthApi();