// u can use this https://www.npmjs.com/package/store2
// or this https://www.npmjs.com/package/localStorage
// or this https://www.npmjs.com/package/localforage
// or this https://www.npmjs.com/package/use-local-storage
// or this https://www.npmjs.com/package/reactjs-localstorage

class localStorageApi {
  getUser() {
    console.log("LOCAL STORAGE ~~~~~~ get user is running");
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  setUser(user) {
    console.log("LOCAL STORAGE ~~~~~~ set user is running");
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    console.log("LOCAL STORAGE ~~~~~~ remove user is running");
    localStorage.removeItem("user");
  }

  getRefreshToken() {
    console.log("LOCAL STORAGE ~~~~~~ get refresh_token is running");
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh_token;
  }

  getAccessToken() {
    console.log("LOCAL STORAGE ~~~~~~ get access_token is running");
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access_token;
  }

  // getAccessToken() {
  //   console.log("get access_token is running");
  //   const user = localStorage.getItem("user");
  //   if(user){
  //     let data = JSON.parse(localStorage.getItem("user"))
  //     return data.access_token
  //   }
  //   return null
  // }

  updateAccessToken(token) {
    console.log("LOCAL STORAGE ~~~~~~ update access_token is running");
    let user = JSON.parse(localStorage.getItem("user"));
    user.access_token = token;
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export default new localStorageApi();
