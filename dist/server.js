import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import authRoutes from "./middleware/authRoutes.js";
import contactRoutes from "./routes/contact.routes.js";
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
const uploadPath = express.static(path.join(__dirname, "../uploads"));
app.get("/", (_, res) => res.send("🧨 E-commerce backend running"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/uploads", uploadPath);
console.log("server.ts uploadPath dirname :: ", uploadPath);
// Serve static frontend files from the "dist" folder
const frontendPath = path.resolve(__dirname, "/home/ubuntu/firewerks/frontend/dist");
app.use(express.static(frontendPath));
console.log("server.ts dirname frontendPath :: ", frontendPath);
// Catch-all route to serve index.html for SPA routes
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});
const PORT = parseInt(process.env.PORT) || 8000;
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
export default app;
