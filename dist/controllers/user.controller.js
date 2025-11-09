import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const registerUser = async (req, res) => {
    try {
        const isAdmin = req.body.password === process.env.ADMIN_KEY;
        const { name, email, password, address, city, postalcode, country, phone } = req.body;
        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "User already exists" });
        const hash = password ? await bcrypt.hash(password, 10) : undefined;
        const user = await User.create({
            name,
            email,
            phone,
            address,
            city,
            postalcode,
            country,
            password: hash,
            isGuest: !password,
            isAdmin,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password)
            return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        console.log("loggind in controller user token ", token);
        res.json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.postalcode = req.body.postalcode || user.postalcode;
    user.country = req.body.country || user.country;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
};
export const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const user = await User.findById(req.user._id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
export const guestUser = async (req, res) => {
    const token = jwt.sign({ role: "guest", guestId: Date.now().toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};
