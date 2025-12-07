import express from "express";

export default function (db) {

    const router = express.Router();

    router.get("/", async (req, res) => {
        const id_video = req.query.id_video;

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

    return router;
}