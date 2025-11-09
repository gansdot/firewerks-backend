import mongoose, { Schema } from "mongoose";
const productSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    category: String,
    image: { type: String, required: false }, // new field    
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.model("Product", productSchema);
