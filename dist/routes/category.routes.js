// routes/categoryRoutes.js
import express from "express";
import { addCategory, getCategories } from "../controllers/category.controller.js";
import { auth, admin } from "../middleware/auth.js";
const router = express.Router();
router.route("/")
    .get(getCategories)
    .post(auth, admin, addCategory);
export default router;
