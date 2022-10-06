// u can use this https://www.npmjs.com/package/store2
// or this https://www.npmjs.com/package/localStorage
// or this https://www.npmjs.com/package/localforage
// or this https://www.npmjs.com/package/use-local-storage
// or this https://www.npmjs.com/package/reactjs-localstorage




export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
}

export function removeUser() {
    localStorage.removeItem("user");
}


