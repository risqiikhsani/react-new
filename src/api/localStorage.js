// u can use this https://www.npmjs.com/package/store2
// or this https://www.npmjs.com/package/localStorage
// or this https://www.npmjs.com/package/localforage
// or this https://www.npmjs.com/package/use-local-storage
// or this https://www.npmjs.com/package/reactjs-localstorage

export default new (class localStorageAPI {
  getUser() {
    console.log("get user is running");
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    console.log("set user is running");
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    console.log("remove user is running");
    localStorage.removeItem("user");
  }

  getRefreshToken() {
    console.log("get refresh_token is running");
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh_token;
  }

  getAccessToken() {
    console.log("get access_token is running");
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access_token;
  }

  updateAccessToken(token) {
    console.log("update access_token is running");
    let user = JSON.parse(localStorage.getItem("user"));
    user.access_token = token;
    localStorage.setItem("user", JSON.stringify(user));
  }
})();
