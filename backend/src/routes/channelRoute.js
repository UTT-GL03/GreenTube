import express from "express";

export default function (db, upload) {

    const router = express.Router();

    router.get("/:id_user", async (req, res) => {
        const { id_user } = req.params;
        const { limit, offset, sortKey, order, firstLoad } = req.query;

        if (!id_user) return res.status(400).json({ success: false, message: "ID utilisateur manquant" });

        const parsedLimit = limit ? parseInt(limit, 10) : 50;
        const parsedOffset = offset ? parseInt(offset, 10) : 0;

        if (isNaN(parsedLimit) || isNaN(parsedOffset) || parsedLimit <= 0 || parsedOffset < 0) {
            return res.status(400).json({ success: false, message: "Paramètres de pagination invalides (limit/offset)." });
        }

        const isFirstLoad = firstLoad === "true";

        const validSortKeys = ["date", "views", "name"];
        const defaultSortKey = "date";
        const actualSortKey = validSortKeys.includes(sortKey) ? sortKey : defaultSortKey;

        let actualOrder = order === "asc" ? "asc" : "desc";

        // Inversion de l'ordre pour les champs date et les vues (plus logique visuellement)
        if (["date", "views"].includes(actualSortKey) && order !== "asc") {
            actualOrder = "asc";
        }
        else if (["date", "views"].includes(actualSortKey) && order === "asc") {
            actualOrder = "desc";
        }

        const videoSelector = { type: "video", "user.id_user": id_user };

        try {
            let userPromise = null;
            let videosPromise = null;

            if (isFirstLoad) {
                const userSelector = { type: "user", _id: id_user };
                userPromise = db.find({ selector: userSelector, limit: 1 });
            }

            videosPromise = db.find({
                selector: videoSelector,
                sort: [{ [actualSortKey]: actualOrder }],
                limit: parsedLimit,
                skip: parsedOffset
                // TODO : Attention, cas ajoute de video pendant consultation
                // Récupérer le last id affiché au client plutôt que skip avec int
            });

            const [userResp, videosResp] = await Promise.all([userPromise, videosPromise].filter(p => p !== null));

            const videos = videosResp?.docs || [];
            const user = userResp?.docs?.[0] || null;

            const responseData = {
                success: true,
                message: "",
                data: {
                    videos
                }
            };

            if (isFirstLoad) {
                if (!user) {
                    return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
                }
                responseData.data.user = user;
            }

            res.json(responseData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erreur serveur interne" });
        }
    })

    router.post("/:id_user/edit", upload.single("avatar"), async (req, res) => {
        const file = req.file;
        const { id_user } = req.params;
        const { newDesc } = req.body;

        try {
            const userResp = await db.find({
                selector: { type: "user", _id: id_user },
                limit: 1
            });
            if (userResp.docs.length === 0) {
                return res.status(404).json({ success: false, error: "Utilisateur introuvable" });
            }
            const user = userResp.docs[0];

            const changesToApply = {};
            if (newDesc) changesToApply.desc = newDesc;
            if (file) changesToApply.avatar = file.path;

            Object.assign(user, changesToApply);

            const contentResp = await db.find({
                selector: {
                    $or: [{ type: "video" }, { type: "comments" }],
                    "user.id_user": id_user
                },
            });

            const docsToUpdate = contentResp.docs.map(doc => {
                return {
                    ...doc,
                    user: {
                        ...doc.user,
                        ...changesToApply
                    }
                };
            });

            await db.bulk({
                docs: [user, ...docsToUpdate]
            });

            res.status(200).json({
                success: true,
                message: "Profil utilisateur mis à jour avec succès !",
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
            res.status(500).json({ success: false, error: "Erreur serveur interne" });
        }
    })

    return router;
}