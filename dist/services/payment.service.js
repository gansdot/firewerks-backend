import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
export const createClient = () => {
    if (!process.env.VITE_RAZORPAY_KEY_ID || !process.env.VITE_RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay API keys are not defined in .env");
    }
    return new Razorpay({
        key_id: process.env.VITE_RAZORPAY_KEY_ID,
        key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
    });
};
export const createOrder = async (amount) => {
    const razorpay = createClient();
    const options = {
        amount: amount * 100,
        currency: "INR",
        payment_capture: 1,
    };
    const res = await razorpay.orders.create(options);
    console.log("razor pay response  ", res);
    return res;
};
