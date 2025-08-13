import express, { Router } from "express";
const router: Router = express.Router();
import { getProfile, updateProfile } from "../../controllers/profile";
import authMiddleware from "../../middlewares/authMiddleware";

router.use(authMiddleware);
router.get(`/`, getProfile);
router.patch(`/`, updateProfile);

export default router;
