import nodemailer from "nodemailer";
import { IOrder } from "../models/order.model.js"; // adjust path
import { generateOrderEmailTemplate } from "./emailTemplate.js";

export const sendOrderEmail = async (to: string, order: IOrder) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Cracker Store" <${process.env.EMAIL_USER}>`,
        to,
        subject: `Your Order Confirmation - #${order._id}`,
        html: generateOrderEmailTemplate(order),
    };

    await transporter.sendMail(mailOptions);
};
