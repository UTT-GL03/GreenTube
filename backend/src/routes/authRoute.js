import express from "express";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(customParseFormat)
dayjs.extend(utc);
dayjs.extend(timezone);

export default function (db) {

    const DEFAUT_AVATAR = "uploads/avatars/default_avatar.png";

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
                        { name: username },
                        { email: username }
                    ]
                },
                limit: 1
            })

            if (result.docs.length === 0) {
                return res.status(401).json({ error: "Nom d'utilisateur/Email ou mot de passe invalide." });
            }

            const user = result.docs[0];

            res.status(201).json({
                message: "Connexion réussie !",
                user: {
                    _id: user._id,
                    name: user.name,
                    avatar: user.avatar,
                    desc: user.desc
                }
            });
        } catch (err) {
            console.error("Erreur login : " + err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    })

    router.post("/register", async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        try {
            const existed = await db.find({
                selector: {
                    type: "user",
                    $or: [
                        { name: username },
                        { email: email }
                    ]
                },
                limit: 1
            });

            if (existed.docs.length > 0) {
                const user = existed.docs[0];
                if (user.name === username && user.email === email) {
                    return res.status(409).json({ error: "Nom et email déjà utilisés." });
                } else if (user.name === username) {
                    return res.status(409).json({ error: "Nom déjà utilisé." });
                } else if (user.email === email) {
                    return res.status(409).json({ error: "Email déjà utilisé." });
                }
            }

            const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");
            const counter = await db.get("counter");
            counter.user_counter += 1;
            const userId = `u${counter.user_counter}`;

            const user = {
                _id: userId,
                type: "user",
                name: username,
                avatar: DEFAUT_AVATAR,
                desc: "",
                email: email,
                password: password,
                subscribers: 0,
                date: now
            }

            await db.insert(user)
            await db.insert(counter);

            res.status(201).json({
                message: "Inscription réussie !",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }
            })

        } catch (err) {
            console.error("Erreur inscription : " + err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    })

    return router;
}