import { Router } from "express";
import { loginController, registerController, verifyEmailController, refreshTokenController, getUserProfileController, logoutController } from "./auth.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.post("/register", registerController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);
router.get("/profile", requireAuth, getUserProfileController);
router.post("/logout",requireAuth,logoutController)

export default router;
