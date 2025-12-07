import express from "express";

export default function (db) {

    const router = express.Router();

    router.get("/", async (req, res) => {
        const { type, query, limit, offset, sortKey, order } = req.query;

        const selector = { type: type };

        if (query && query.trim().toLowerCase() !== "") {
            selector.name = { $regex: query };
        }

        // Pour avoir un visuel plus naturel pour les dates
        // TODO : À rendre plus propre 
        let actualOrder = order === "desc" ? "desc" : "asc";
        if (sortKey === "date" || sortKey === "subscribers" || sortKey === "views") {
            actualOrder = actualOrder === "asc" ? "desc" : "asc";
        }

        try {
            const result = await db.find({
                selector,
                sort: [{ [sortKey]: actualOrder }],
                limit: limit ? parseInt(limit, 10) : 50,
                // TODO : Attention, cas ajoute de video pendant consultation 
                // Récupérer le last id affiché au client plutôt que skip avec int
                skip: offset ? parseInt(offset, 10) : 0
            });

            res.json(result.docs)
        } catch (err) {
            console.error("Erreur chargement Home : " + err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    })

    return router;
}