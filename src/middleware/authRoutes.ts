import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

router.post("/guest-token", (req, res) => {
  const guestToken = jwt.sign(
    { role: "guest", guestId: Date.now().toString() },
    ""+process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token: guestToken });
});

export default router;