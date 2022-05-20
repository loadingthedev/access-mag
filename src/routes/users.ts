import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { authAdminMiddleWare } from "../middlewares/authMiddleWare";
const router = Router();

router.get("/", authAdminMiddleWare, UsersController.getAll);
router.post("/", UsersController.create);

export default router;
