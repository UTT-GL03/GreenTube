import express from "express";

export default function (db) {

    const router = express.Router();

    router.get("/", async (req, res) => {
        const { id_user, limit, offset, sortKey, order, firstLoad } = req.query;
        const isFirstLoad = firstLoad === true || firstLoad === "true"

        // Get user if needed
        // Get videos
        let userSelector;
        if (isFirstLoad) {
            userSelector = { type: "user", _id: id_user };
        }
        
        const videoSelector = { type: "video", id_user: id_user };

        // Pour avoir un visuel plus naturel pour les dates
        // TODO : À rendre plus propre 
        let actualOrder = order === "desc" ? "desc" : "asc";
        if (sortKey === "date" || sortKey === "subscribers" || sortKey === "views") {
            actualOrder = actualOrder === "asc" ? "desc" : "asc";
        }

        try {
            const videos = await db.find({
                selector: videoSelector,
                sort: [{ [sortKey]: actualOrder }],
                limit: limit ? parseInt(limit, 10) : 50,
                // TODO : Attention, cas ajoute de video pendant consultation 
                // Récupérer le last id affiché au client plutôt que skip avec int
                skip: offset ? parseInt(offset, 10) : 0
            });

            let user;
            if(isFirstLoad){
                user = await db.find({
                    selector: userSelector,
                    limit: 1
                })
            }

            res.json(isFirstLoad ? {
                user: user.docs[0],
                videos: videos.docs.filter(d => d.type === "video")
            } : {
                videos: videos.docs.filter(d => d.type === "video")
            })
        } catch (err) {
            console.error("Erreur chargement Channel : " + err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    })

    return router;
}