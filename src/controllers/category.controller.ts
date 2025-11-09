// controllers/category.controller.js
import { AuthRequest } from "../middleware/auth.js";
import Category from "../models/category.model.js";

export const addCategory = async (req: AuthRequest, res: any) => {
    try {
        const { name } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: "Error adding category" });
    }
};

export const getCategories = async (req: AuthRequest, res: any) => {
    const categories = await Category.find();
    res.json(categories);
};
