import { Router } from "express";
import FaqController from "../controllers/FaqController";
import { authAdminMiddleWare } from "../middlewares/authMiddleWare";
const router = Router();

router.get("/", authAdminMiddleWare, FaqController.getAll);
router.post("/", authAdminMiddleWare, FaqController.create);

export default router;
