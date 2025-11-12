import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// ensure uploads folder exists
//const uploadDir = path.join(process.cwd(), "uploads");
const uploadConfig = process.env.UPLOAD_DIR!;


const uploadDir = path.join(process.cwd(), uploadConfig);
//const uploadDir = path.join(process.cwd(), "uploads");


if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// configure multer for local disk storage
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadConfig);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  console.log("upload directory backendupload .... ", uploadDir);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // return the relative file path
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

export default router;
