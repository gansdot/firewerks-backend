import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts, getProductsByCategory } from "../controllers/product.controller.js";
const router = Router();

router.get("/category/:categoryId", getProductsByCategory);
router.get("/", getProducts);
router.get("/search", searchProducts);
router.post("/", createProduct); // Admin route, add auth later
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;
