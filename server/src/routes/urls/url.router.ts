import { Router } from "express";
import {
  getUrls,
  getUrlById,
  createUrl,
  updateUrl,
  deleteUrl,
} from "../../controllers/urls";
import authMiddleware from "../../middlewares/authMiddleware";

const urlRouter: Router = Router();

urlRouter.use(authMiddleware);

urlRouter.get("/", getUrls);
urlRouter.get("/:urlId", getUrlById);
urlRouter.post("/", createUrl);
urlRouter.put("/:urlId", updateUrl);
urlRouter.delete("/:urlId", deleteUrl);

export default urlRouter;
