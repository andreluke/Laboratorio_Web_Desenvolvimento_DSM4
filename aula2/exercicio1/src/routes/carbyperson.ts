import { Router } from "express";
import controller from "../controllers/CarsByPersonController";
const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/", controller.delete);

export default router