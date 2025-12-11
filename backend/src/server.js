import express from "express";
import cors from "cors";
import nano from "nano";
import multer from "multer";
import path from "path";

import authRoute from "./routes/authRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import homeRoute from "./routes/homeRoute.js";
import channelRoute from "./routes/channelRoute.js";
import videoRoute from "./routes/videoRoute.js";

const DB_URL = "http://tbhc:tbhc@couchdb:5984";
const PORT = 3000;

const app = express();

// DB
const couch = nano(DB_URL);
const db = couch.db.use("greentube");

// DISK STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === "video"){
      cb(null, "uploads/videos/");
    }
    else if(file.fieldname === "avatar"){
      cb(null, "uploads/avatars/");
    }
    else if(file.fieldname === "thumbnail"){
      cb(null, "uploads/thumbnails/");
    }
    else{
      cb(null, "uploads/others/");
    }
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, unique + "_" + file.originalname)
  }
});

const upload = multer({ storage })

//
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute(db))
app.use("/upload", uploadRoute(db, upload))
app.use("/home", homeRoute(db))
app.use("/channel", channelRoute(db, upload))
app.use("/video", videoRoute(db))

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", async (_, res) => {
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