import { httpGet, httpPost } from "./httpClient";

export const backApi = {

    login: async (username, password) => {
        const data = await httpPost("auth/login", { username, password });
        return data;
    },

    register: async (username, email, password) => {
        const data = await httpPost("auth/register", { email, username, password })
        return data;
    },

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

    uploadVideo: async () => {
        return
    }
}