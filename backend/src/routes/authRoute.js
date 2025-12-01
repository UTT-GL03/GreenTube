import express from "express";

export default function (db) {

    const router = express.Router();

    router.post("/login", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const result = await db.find({
                selector: {
                    type: "user",
                    password: password,
                    $or: [
                        { pseudo: username },
                        { email: username }
                    ]
                },
                limit: 1
            })

            if (result.docs.length === 0) {
                return res.status(401).json({ error: "Invalid username/email or password." });
            }

            const user = result.docs[0];

            res.json({
                success: true,
                message: "Login successful",
                user: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    email: user.email,
                    avatar: user.avatar
                }
            });
        } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    })

    router.post("/register", async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const date = Date.now()
        try {
            //TODO
        } catch (err) {
            console.error("Register error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    })
    
    return router;
}