import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
// ✅ New middleware that allows guest checkout
export const optionalAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return next(); // guest user — proceed without error
};
// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: "Not authorized as admin" });
    }
};
