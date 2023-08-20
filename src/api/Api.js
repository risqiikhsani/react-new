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
        return instance.get(`/app/posts/${id}`);
    },

    update: function (id, data) {
        return instance.put(`/app/posts/${id}`, data, config);
    },

    del: function (id) {
        return instance.delete(`/app/posts/${id}`);
    },

}

const comment_api = {

    create: function (post_id, data) {
        return instance.post(`/app/posts/${post_id}/comments`, JSON.stringify(data));
    },

    get_list: function (post_id, last_string) {
        return instance.get(`/app/posts/${post_id}/comments${last_string}`);
    },

    update: function (id, data) {
        return instance.put(`/app/comments/${id}`, JSON.stringify(data));
    },

    del: function (id) {
        return instance.delete(`/app/comments/${id}`);
    },
}


const reply_api = {
    create: function (comment_id, data) {
        return instance.post(`/app/comments/${comment_id}/replies`, JSON.stringify(data));
    },

    get_list: function (comment_id, last_string) {
        return instance.get(`/app/comments/${comment_id}/replies${last_string}`);
    },

    update: function (id, data) {
        return instance.put(`/app/replies/${id}`, JSON.stringify(data));
    },

    del: function (id) {
        return instance.delete(`/app/replies/${id}`);
    },

}

const like_api = {
    post_likehandler: function (id) {
        return instance.get(`/app/posts/${id}/likehandler`);
    },

    comment_likehandler: function (id) {
        return instance.get(`/app/comments/${id}/likehandler`);
    },

    reply_likehandler: function (id) {
        return instance.get(`/app/replies/${id}/likehandler`);
    },
}

const save_api = {
    post_savehandler: function (id) {
        return instance.get(`/app/posts/${id}/savehandler`);
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
    get_my_waiting_list: function () {
        return instance.get(`waiting-requests`);
    },
    accept_user: function(id){
        return instance.get(`requests/${id}/accept`);
    },
    decline_user: function(id){
        return instance.get(`requests/${id}/accept`);
    },
    send_request: function(id){
        return instance.get(`user/${id}/send_request`);
    },
    cancel_sent_request: function(id){
        return instance.get(`user/${id}/cancel_sent_request`);
    },
}

const connection_api = {
    get_list: function() {
        return instance.get(`connections`);
    },
    get_user_list: function(id){
        return instance.get(`user/${id}/connections`);
    },
    disconnect: function(id){
        return instance.get(`user/${id}/remove_connection`);
    },
}

const notification_api = {
    get_list: function(last_string) {
        return instance.get(`realtime/notifications${last_string}`);
    },
}

const chatroom_api = {
    get_list: function(last_string) {
        return instance.get(`realtime/chatrooms${last_string}`);
    },
}

const relationship_api = {
    get_detail: function(id){
        return instance.get(`user/${id}/relationship`);
    },
    update: function(id,data){
        return instance.put(`user/${id}/relationship`,JSON.stringify(data));
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
    notification_api,
    chatroom_api,
    relationship_api,
}

