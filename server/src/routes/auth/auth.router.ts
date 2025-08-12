import { Router } from "express";
import signup from "../../controllers/auth/signup.controller.ts";
import signin from "../../controllers/auth/signin.controller.ts";
import signout from "../../controllers/auth/signout.controller.ts";
const router: Router = Router();

router.post(`/signup`, signup);
router.post(`/signin`, signin);
router.post(`/signout`, signout);

export default router;
