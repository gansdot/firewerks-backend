import { Router } from "express";
import { registerUser, loginUser, updateUserProfile ,getUserProfile} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile")
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile);

export default router;
