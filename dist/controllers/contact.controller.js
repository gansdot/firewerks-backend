import Contact from "../models/contact.model.js";
// 📨 Save a new contact form submission
export const createContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        console.log("createContactMessge +************ ", req.body);
        if (!name || !email || !message)
            return res.status(400).json({ message: "All fields are required" });
        const contact = new Contact({ name, email, subject, message });
        await contact.save();
        res.status(201).json({ message: "Message sent successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
// 🧾 Get all messages (admin)
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
// 💬 Admin reply
export const replyToMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply, adminName } = req.body;
        const contact = await Contact.findById(id);
        if (!contact)
            return res.status(404).json({ message: "Message not found" });
        contact.reply = reply;
        contact.repliedBy = adminName;
        contact.repliedAt = new Date();
        await contact.save();
        res.json({ message: "Reply saved successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
