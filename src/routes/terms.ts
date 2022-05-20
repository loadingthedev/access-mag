import { Router } from "express";
import TermsController from "../controllers/TermsController";
import { authAdminMiddleWare } from "../middlewares/authMiddleWare";
const router = Router();

router.get("/", authAdminMiddleWare, TermsController.getAll);
router.post("/", authAdminMiddleWare, TermsController.create);

export default router;
