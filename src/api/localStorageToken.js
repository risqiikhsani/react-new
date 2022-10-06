// u can use this https://www.npmjs.com/package/store2
// or this https://www.npmjs.com/package/localStorage
// or this https://www.npmjs.com/package/localforage
// or this https://www.npmjs.com/package/use-local-storage
// or this https://www.npmjs.com/package/reactjs-localstorage



export function getRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
}

export function getAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
}

export function updateAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
}