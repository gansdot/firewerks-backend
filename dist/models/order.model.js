import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: { type: String, required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
            image: { type: String, required: false },
        },
    ],
    total: { type: Number, required: true },
    shippingAddress: {
        address: String,
        city: String,
        postalcode: String,
        country: String,
    },
    status: { type: String, default: "Processing" },
    paymentId: String,
}, { timestamps: true });
export default mongoose.model("Order", orderSchema);
