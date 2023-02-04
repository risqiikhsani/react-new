import instance from "./instance";

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

const post_api = {
    get_list: function (last_string) {
        return instance.get(`/app/posts${last_string}`);
    },

    create: function (data) {
        return instance.post("/app/posts", data, config);
    },

    get_detail: function (id) {
        return instance.get(`/app/post/${id}`);
    },

    update: function (id, data) {
        return instance.put(`/app/post/${id}`, data, config);
    },

    del: function (id) {
        return instance.delete(`/app/post/${id}`);
    },

}

const comment_api = {

    create: function (post_id, data) {
        return instance.post(`/app/post/${post_id}/comments`, JSON.stringify(data));
    },

    get_list: function (post_id, last_string) {
        return instance.get(`/app/post/${post_id}/comments${last_string}`);
    },

    update: function (id, data) {
        return instance.put(`/app/comment/${id}`, JSON.stringify(data));
    },

    del: function (id) {
        return instance.delete(`/app/comment/${id}`);
    },
}


const reply_api = {
    create: function (comment_id, data) {
        return instance.post(`/app/comment/${comment_id}/replies`, JSON.stringify(data));
    },

    get_list: function (comment_id, last_string) {
        return instance.get(`/app/comment/${comment_id}/replies${last_string}`);
    },

    update: function (id, data) {
        return instance.put(`/app/reply/${id}`, JSON.stringify(data));
    },

    del: function (id) {
        return instance.delete(`/app/reply/${id}`);
    },

}

const like_api = {
    post_likehandler: function (id) {
        return instance.get(`/app/post/${id}/likehandler`);
    },

    comment_likehandler: function (id) {
        return instance.get(`/app/comment/${id}/likehandler`);
    },

    reply_likehandler: function (id) {
        return instance.get(`/app/reply/${id}/likehandler`);
    },
}

const save_api = {
    post_savehandler: function (id) {
        return instance.get(`/app/post/${id}/savehandler`);
    },
}

const user_api = {
    get_detail: function (id) {
        return instance.get(`/user-detail/${id}`);
    },

    get_list: function () {
        return instance.get(`/user-list`);
    },
}

const my_api = {
    update_user: function (data) {
        return instance.put(`/my/user`, data, config);
    },

    update_profile: function (data) {
        return instance.put(`/my/profile`, data, config);
    },
}

const request_api = {
    get_list: function () {
        return instance.get(`requests`);
    },
}

const connection_api = {
    get_list: function() {
        return instance.get(`connections`);
    },
}

export { 
    post_api, 
    comment_api, 
    reply_api, 
    like_api, 
    save_api, 
    user_api ,
    my_api,
    request_api,
    connection_api,
}

