import mongoose, { Schema } from "mongoose";
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },
    repliedBy: { type: String },
    repliedAt: { type: Date },
}, { timestamps: true });
export default mongoose.model("Contact", contactSchema);
