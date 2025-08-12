import express, { Router } from "express";
const router: Router = express.Router();
import getProfile from "../../controllers/profile/profile.controller";
import authMiddleware from "../../middlewares/authMiddleware";

router.get(`/`, authMiddleware, getProfile);

export default router;
