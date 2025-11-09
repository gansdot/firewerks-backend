import express from "express";
import { addReview, getReviewsByProduct, getReviewSummary } from "../controllers/reviews.controller.js";
const router = express.Router();
router.post("/", addReview);
router.get("/:productId", getReviewsByProduct);
router.get("/summary/:productId", getReviewSummary);
export default router;
