import express from "express";

export default function (db, upload) {

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

        const videoSelector = { type: "video", "user.id_user": id_user };

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
            if (isFirstLoad) {
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
            console.error("Erreur serveur interne : " + err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    })

    router.post("/:id_user/edit", upload.single("avatar"), async (req, res) => {
        const file = req.file;
        const id_user = req.params.id_user;
        const { newDesc } = req.body;

        // Get user
        const userSelector = { type: "user", _id: id_user };

        // Get tout les comms et videos et l'user 
        const contentSelector = {
            $or: [
                { type: "video" },
                { type: "comments" }
            ],
            "user.id_user": id_user
        };

        try {
            const userResp = await db.find({
                selector: userSelector,
                limit: 1
            });
            const contentResp = await db.find({
                selector: contentSelector,
            });

            if (userResp.docs.length === 0) {
                return res.status(404).json({ success: false, error: "Utilisateur introuvable" });
            }

            const user = userResp.docs[0];

            if (newDesc) user.desc = newDesc;
            if (file) user.avatar = file.path;

            const docsToUpdate = contentResp.docs.map(doc => {
                const updatedUser = { ...doc.user };
                if (newDesc) updatedUser.desc = newDesc;
                if (file) updatedUser.avatar = file.path;

                return {
                    ...doc,
                    user: updatedUser
                };
            });

            await db.bulk({
                docs: [user, ...docsToUpdate]
            });

            res.status(200).json({
                success: true,
                message: "Profil utilisateur mis à jour avec succès !",
                user
            })
        } catch (err) {
            console.error("Erreur serveur interne : " + err);
            res.status(500).json({ success: false, error: "Erreur serveur interne" });
        }
    })

    return router;
}