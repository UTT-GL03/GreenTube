import express from "express";
import cors from "cors"
import nano from "nano"
import authRoute from "./routes/authRoute.js"
import uploadRoute from "./routes/uploadRoute.js"

const DB_URL = "http://tbhc:tbhc@couchdb:5984"
const PORT = 3000;

const app = express();
const couch = nano(DB_URL)
const db = couch.db.use("greentube");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute(db))
app.use("/upload", uploadRoute(db))

app.get("/", async (req, res) => {
  try {
    const info = await db.info();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});