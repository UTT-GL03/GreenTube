const API_URL = "http://localhost:3000"

export const backApi = {

    login: async (username, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        return data;
    },

    signUp: async () => {
        return
    },

    uploadVideo: async () => {
        return
    }
}