import express from "express";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(customParseFormat)
dayjs.extend(utc);
dayjs.extend(timezone);

export default function (db) {

    const router = express.Router();

    router.get("/", async (req, res) => {
        const id_video = req.query.id_video;

        if (!id_video) {
            return res.status(400).json({ success: false, message: "id_video manquant" });
        }
        // Get la video en question
        // Get les commentaires de la video
        const selector = {
            $or: [
                { type: "video", _id: id_video },
                { type: "comment", id_video: id_video },
            ]
        };

        // Get les recommendations
        const relatedSelector = {
            type: "video",
            _id: { $ne: id_video }
        }

        try {
            const result = await db.find({
                selector
            });
            const related = await db.find({
                selector: relatedSelector,
                limit: 3
            });

            res.json({
                video: result.docs.find(d => d.type === "video"),
                comments: result.docs.filter(d => d.type === "comment"),
                related: related.docs
            });
        } catch (err) {
            console.error("Erreur chargement video : " + err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    })

    router.post("/comment", async (req, res) => {
        const { content, id_video, id_user, user_name, user_avatar } = req.body;
        const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

        try {
            const counter = await db.get("counter");
            counter.comment_counter += 1;
            const commentId = `c${counter.comment_counter}`;

            const comment = {
                _id: commentId,
                type: "comment",
                user: {
                    id_user,
                    name: user_name,
                    avatar: user_avatar
                },
                id_video,
                date: now,
                content
            }

            await db.insert(comment)
            await db.insert(counter);

            res.status(201).json({
                success: true,
                message: "Commentaire publié avec succès !",
                data: {
                    comment: comment
                }
            })
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: `Erreur serveur interne : ${err} !`
            })
        }
    })

    router.post("/:id_video/view", async (req, res) => {
        const { id_video } = req.params;
 
        if(!id_video) return res.status(400).json({ success: false, message: "id_video manquant" });

        try {
            const videoResp = await db.find({
                selector: {
                    _id: id_video,
                }
            });

            if(videoResp.docs.length === 0) return res.status(404).json({ success: false, message: `Video "${id_video}" introuvable` });
            const video = videoResp.docs[0];
            
            video.views++;

            await db.insert(video)

            res.status(201).json({
                success: true,
                message: "Vue incrementée à la vidéo avec succès !",
            })
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: `Erreur serveur interne : ${err} !`
            })
        }
    })

    return router;
}