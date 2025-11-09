import Review from "../models/review.model.js";
// POST /api/reviews
// POST /api/reviews
export const addReview = async (req, res) => {
    try {
        const { user, product, rating, comment } = req.body;
        // assuming protect middleware sets req.user
        console.log("");
        // Validate inputs
        if (!product || !rating) {
            console.log("product.  ", product);
            console.log("rating.  ", rating);
            return res.status(400).json({ message: "Product and rating are required." });
        }
        // Check if user already reviewed
        const existing = await Review.findOne({ product: product, user: user });
        if (existing) {
            existing.rating = rating;
            existing.comment = comment;
            await existing.save();
            return res.json({ message: "Review updated successfully." });
        }
        const review = await Review.create({
            product: product,
            user: user,
            rating,
            comment,
        });
        res.status(201).json(review);
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Failed to add review." });
    }
};
// GET /api/reviews/product/:id
export const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id }).populate("user", "name");
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
export const getReviewSummary = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId });
        if (!reviews.length) {
            return res.status(200).json({
                averageRating: 0,
                totalReviews: 0,
                breakdown: {}
            });
        }
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
        const averageRating = totalRating / totalReviews;
        // breakdown by star rating
        const breakdown = [1, 2, 3, 4, 5].reduce((acc, star) => {
            acc[star] = reviews.filter(r => r.rating === star).length;
            return acc;
        }, {});
        res.json({ averageRating, totalReviews, breakdown });
    }
    catch (error) {
        console.error("Error fetching review summary:", error);
        res.status(500).json({ message: "Failed to fetch review summary" });
    }
};
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate("user", "name");
        res.json({ reviews });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
