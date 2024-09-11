import { Router } from "express";
import controller from "../controllers/UserController";

const router = Router();

router.get("/",  controller.list);
router.post("/", controller.create);
router.delete("/",  controller.delete);
router.put("/email",  controller.updatemail);
router.put("/nome",  controller.updatenome);

export default router