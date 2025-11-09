import mongoose, { Schema, Document } from "mongoose";

interface OrderItem {
  product: mongoose.Types.ObjectId;
  name: string,
  quantity: number;
  price: number,
  image?: string,
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items?: OrderItem[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentId?: string;
  email?: string;

}

const orderSchema = new mongoose.Schema(
  {
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

  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
