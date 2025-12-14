import express from "express";

export default function (db) {

    const router = express.Router();

    router.get("/", async (req, res) => {
        const { type, query, limit, offset, sortKey, order } = req.query;

        const selector = { type: type };

        const parsedLimit = limit ? parseInt(limit, 10) : 50;
        const parsedOffset = offset ? parseInt(offset, 10) : 0;

        if (isNaN(parsedLimit) || isNaN(parsedOffset) || parsedLimit <= 0 || parsedOffset < 0) {
            return res.status(400).json({ success: false, message: "Paramètres de pagination invalides (limit/offset)." });
        }

        if (query && query.trim().toLowerCase() !== "") {
            selector.name = { $regex: query };
        }

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

        try {
            const result = await db.find({
                selector,
                sort: [{ [sortKey]: actualOrder }],
                limit: parsedLimit,
                // TODO : Attention, cas ajoute de video pendant consultation 
                // Récupérer le last id affiché au client plutôt que skip avec int
                skip: parsedOffset
            });

            res.json({ success: true, data: result.docs })
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Erreur serveur interne" });
        }
    })

    return router;
}