import { Router } from "express";
import { checkout, confirmOrder, getOrderById, getUserOrders, getAllOrders, updateOrderStatus, guestCheckout } from "../controllers/order.controller.js";
import { auth, admin, optionalAuth } from "../middleware/auth.js";
const router = Router();
router.get("/myorders", auth, getUserOrders);
router.post("/checkout", auth, checkout);
router.post("/confirm", confirmOrder);
// Get order by MongoDB ID
router.get("/:id", auth, getOrderById);
router.get("/guest/:id", optionalAuth, getOrderById);
router.put("/:id/status", auth, updateOrderStatus);
router.get("/", auth, admin, getAllOrders);
router.post("/guestcheckout", optionalAuth, guestCheckout);
export default router;
