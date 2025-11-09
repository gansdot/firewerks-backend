import Product from "../models/product.model.js";
// ✅ Create Product
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Get Single Product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Update Product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const searchProducts = async (req, res) => {
    try {
        const query = req.query.q || req.query.query || "";
        const regex = new RegExp(query, "i"); // case-insensitive
        const products = await Product.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        }).populate("category");
        res.json(products);
    }
    catch (err) {
        console.error("Error searching products:", err);
        res.status(500).json({ message: "Failed to search products" });
    }
};
// ✅ Get Single Product
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate("category");
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching category products:", error);
        res.status(500).json({ message: "Server error" });
    }
};
