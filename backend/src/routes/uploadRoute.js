import express from "express";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(customParseFormat)
dayjs.extend(utc);
dayjs.extend(timezone);

export default function (db, upload) {
    const router = express.Router()

    router.post("/video", upload.single("video"), async (req, res) => {
        const file = req.file;
        const { name, desc, id_user } = req.body;
        const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

        if (!file) return res.status(400).json({ success: false, message: "Aucun fichier uploadé" });

        try {
            const counter = await db.get("counter");
            counter.video_counter += 1;
            const videoId = `v${counter.video_counter}`;

            const video = {
                _id: videoId,
                type: "video",
                id_user,
                date: now,
                name,
                desc,
                path: `/uploads/videos/${file.filename}`,
                views: 0
            }

            await db.insert(video)
            await db.insert(counter);

            res.status(201).json({
                success: true,
                message: "Upload réussi !",
                data: {
                    video: video
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

    router.post("/avatar", upload.single("avatar"), (res, req) => {
        res.json(req.file)
    })

    return router;
}