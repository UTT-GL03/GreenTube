import express from "express";
import ffmpeg from "fluent-ffmpeg";
import path from "path"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(customParseFormat)
dayjs.extend(utc);
dayjs.extend(timezone);

export default function (db, upload) {
    const router = express.Router()

    // TODO : Add Thumbnails
    router.post("/video", upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]), async (req, res) => {
        const videoFile = req.files["video"]?.[0];
        const thumbFile = req.files["thumbnail"]?.[0];
        const { name, desc, id_user, user_name, user_avatar } = req.body;
        const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

        if (!videoFile) return res.status(400).json({ success: false, message: "Aucun fichier uploadé" });

        try {
            const counter = await db.get("counter");
            counter.video_counter += 1;
            const videoId = `v${counter.video_counter}`;

            let thumbnailPath;

            if (thumbFile) {
                thumbnailPath = `uploads/thumbnails/${thumbFile.filename}`;
            }
            else {
                const thumbFilename = `${path.parse(videoFile.filename).name}.png`;
                thumbnailPath = `uploads/thumbnails/${thumbFilename}`;

                await new Promise((resolve, reject) => {
                    ffmpeg(videoFile.path)
                        .screenshots({
                            timestamps: ["50%"],
                            filename: thumbFilename,
                            folder: "uploads/thumbnails",
                            size: "300x200"
                        })
                        .on("end", resolve)
                        .on("error", reject);
                });
            }

            const video = {
                _id: videoId,
                type: "video",
                user: {
                    id_user,
                    name: user_name,
                    avatar: user_avatar
                },
                date: now,
                name,
                desc,
                path: `uploads/videos/${videoFile.filename}`,
                thumbnail: thumbnailPath,
                views: 0
            }

            await db.insert(video)
            await db.insert(counter);

            res.status(201).json({
                success: true,
                message: "Upload réussi !",
                data: {
                    video
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

    return router;
}