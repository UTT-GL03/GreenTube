import { httpGet, httpPost } from "./httpClient";

export const backApi = {

    // POST
    login: async (username, password) => {
        const data = await httpPost("auth/login", { username, password });
        return data;
    },

    register: async (username, email, password) => {
        const data = await httpPost("auth/register", { email, username, password })
        return data;
    },

    uploadVideo: async (formData) => {
        const data = await httpPost("upload/video", formData);
        return data;
    },

    addComment: async ({ content, id_video, id_user, user_name, user_avatar }) => {
        const data = await httpPost("video/comment", { content, id_video, id_user, user_name, user_avatar });
        return data;
    },

    editChannel: async (channelId, formData) => {
        const data = await httpPost(`channel/${channelId}/edit`, formData);
        return data;
    },

    // GET
    getHome: async ({ type, query, limit, offset, sortKey, order } = {}) => {
        const data = httpGet("home", { type, query, limit, offset, sortKey, order })
        return data;
    },

    getChannel: async ({ id_user, limit, offset, sortKey, order, firstLoad } = {}) => {
        const data = await httpGet("channel", { id_user, limit, offset, sortKey, order, firstLoad });
        return data;
    },

    getVideo: async (id_video) => {
        const data = await httpGet("video", { id_video });
        return data
    },
};