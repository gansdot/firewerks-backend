import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    reply?: string;
    repliedBy?: string;
    repliedAt?: Date;
    createdAt: Date;
}

const contactSchema = new Schema<IContact>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        reply: { type: String },
        repliedBy: { type: String },
        repliedAt: { type: Date },
    },
    { timestamps: true }
);

export default mongoose.model<IContact>("Contact", contactSchema);
