import { Router } from "express";
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart } from "../controllers/cart.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.put("/", auth, updateQuantity);
router.delete("/:productId", auth, removeFromCart);
router.delete("/", auth, clearCart);

export default router;
