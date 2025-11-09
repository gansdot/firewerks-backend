import express from "express";
import { addReview, getReviews, getReviewSummary } from "../controllers/review.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// Review summary first
router.get("/summary/:productId", getReviewSummary);
// All reviews
router.get("/:productId", getReviews);
// Add review (auth required)
router.post("/", auth, addReview);
export default router;
