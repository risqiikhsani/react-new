
import instance from "./instance";
import localStorageApi from "./localStorageApi";

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

const auth_api = {
  login: function (data) {
    return instance.post(`/login`, data);
  },

  login_google: function (data) {
    return instance.post(`/login/google`, data);
  },

  signup: function (data) {
    return instance.post(`/signup`, data);
  },

  refresh_access_token: function(){
    return instance.post(`/token-refresh`, JSON.stringify(localStorageApi.getRefreshToken()));
  }


}

export {
  auth_api,
};

