import express from "express";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(customParseFormat)
dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_AVATAR_COUNT = 8;
const random = Math.floor(Math.random() * DEFAULT_AVATAR_COUNT) + 1;
const DEFAULT_AVATAR = `uploads/avatars/default_avatar_${random}.png`;

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
                        { name: username },
                        { email: username }
                    ]
                },
                limit: 1
            })

            if (result.docs.length === 0) {
                return res.status(401).json({ success: false, message: "Nom d'utilisateur/Email ou mot de passe invalide." });
            }

            const user = result.docs[0];

            res.status(200).json({
                success: true,
                message: "Connexion réussie !",
                data: {
                    user: {
                        _id: user._id,
                        name: user.name,
                        avatar: user.avatar,
                        desc: user.desc
                    }
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erreur serveur interne" });
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
                let errorMessage = "Erreur d'enregistrement.";
                if (user.name === username && user.email === email) {
                    errorMessage = "Nom et email déjà utilisés.";
                } else if (user.name === username) {
                    errorMessage = "Nom déjà utilisé.";
                } else if (user.email === email) {
                    errorMessage = "Email déjà utilisé.";
                }
                return res.status(409).json({ success: false, message: errorMessage });
            }

            const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");
            const counter = await db.get("counter");
            counter.user_counter += 1;
            const userId = `u${counter.user_counter}`;

            const user = {
                _id: userId,
                type: "user",
                name: username,
                avatar: DEFAULT_AVATAR,
                desc: "",
                email: email,
                password: password,
                subscribers: 0,
                date: now
            }

            await db.insert(user)
            await db.insert(counter);

            res.status(201).json({
                success: true,
                message: "Inscription réussie !",
                data: {
                    user: {
                        _id: user._id,
                        name: user.name,
                        avatar: user.avatar,
                        desc: user.desc
                    }
                }
            })

        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erreur serveur interne" });
        }
    })

    return router;
}