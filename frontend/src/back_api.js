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

    register: async (username, email, password) => {
        console.log("start 1")
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password })
        });

        const data = await res.json();
        return data;
    },

    uploadVideo: async () => {
        return
    }
}