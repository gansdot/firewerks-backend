import express from "express";
import { createContactMessage, getAllMessages, replyToMessage } from "../controllers/contact.controller.js";
import { auth, admin } from "../middleware/auth.js";
const router = express.Router();
// public
router.post("/", createContactMessage);
// admin
router.get("/", auth, admin, getAllMessages);
router.put("/:id/reply", auth, admin, replyToMessage);
export default router;
