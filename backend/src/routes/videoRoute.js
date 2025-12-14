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

    router.get("/:id_video", async (req, res) => {
        const { id_video } = req.params;

        if (!id_video) {
            return res.status(400).json({ success: false, message: "ID video manquant." });
        }

        const videoSelector = { type: "video", _id: id_video };
        const commentsSelector = { type: "comment", id_video: id_video };
        const relatedSelector = { type: "video", _id: { $ne: id_video } };

        try {
            const [videoResp, commentsResp, relatedResp] = await Promise.all([
                db.find({ selector: videoSelector }),
                db.find({ selector: commentsSelector, sort: [{ ["date"]: "desc" }], }),
                db.find({ selector: relatedSelector, limit: 3 })
            ]);

            if (videoResp.docs.length === 0) return res.status(404).json({ success: false, message: `Video "${id_video}" introuvable.` });
            const video = videoResp.docs[0];
            const comments = commentsResp.docs;
            const related = relatedResp.docs;

            res.json({
                success: true,
                data: {
                    video,
                    comments,
                    related
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur interne !" });
        }
    })

    router.post("/:id_video/comment", async (req, res) => {
        const { id_video } = req.params;
        const { content, id_user, user_name, user_avatar } = req.body;

        if (!id_video) return res.status(400).json({ success: false, message: "ID video manquant." });

        const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

        try {

            let updatedCounter;
            let commentId;
            let counterAttempts = 0;

            // Mise à jour de du compteur d'id comment
            do {
                const currentCounter = await db.get("counter");

                currentCounter.comment_counter += 1;
                commentId = `c${currentCounter.comment_counter}`;

                try {
                    updatedCounter = await db.insert(currentCounter);
                }
                catch (conflictError) {
                    if (conflictError.statusCode === 409 && counterAttempts < 5) {
                        counterAttempts++;
                        console.warn(`Conflit de révision sur 'counter', tentative de réessai #${counterAttempts}`);
                        continue;
                    }
                    console.error(conflictError);
                    res.status(conflictError.statusCode).json({
                        success: false,
                        message: "Erreur serveur interne !",
                    });
                    return;
                }

            } while (!updatedCounter);

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
            };

            await db.insert(comment);

            res.status(201).json({
                success: true,
                message: "Commentaire publié avec succès !",
                data: {
                    comment
                }
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: `Erreur serveur interne !`
            });
        }
    })

    router.post("/:id_video/view", async (req, res) => {
        const { id_video } = req.params;

        if (!id_video) return res.status(400).json({ success: false, message: "ID video manquant." });

        try {
            const videoResp = await db.find({
                selector: {
                    _id: id_video,
                }
            });

            if (videoResp.docs.length === 0) return res.status(404).json({ success: false, message: `Video "${id_video}" introuvable.` });
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