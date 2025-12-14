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

    // TODO : delete fichier si erreur
    // TODO : user existe dans bdd
    router.post("/video", upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]), async (req, res) => {
        const videoFile = req.files["video"]?.[0];
        const thumbFile = req.files["thumbnail"]?.[0];
        const { name, desc, id_user, user_name, user_avatar } = req.body;
        const now = dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss");

        if (!videoFile) return res.status(400).json({ success: false, message: "Aucun fichier uploadé." });

        try {
            let updatedCounter;
            let videoId;
            let counterAttempts = 0;

            // Mise à jour de du compteur d'id video
            do {
                const currentCounter = await db.get("counter");

                currentCounter.video_counter += 1;
                videoId = `v${currentCounter.video_counter}`;

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
                        .on("error", (err) => {
                            console.error("Erreur FFmpeg:", err);
                            reject(new Error("Échec de la génération de la vignette."));
                        });
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
            };

            await db.insert(video);

            res.status(201).json({
                success: true,
                message: "Upload réussi !",
                data: {
                    video
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

    return router;
}