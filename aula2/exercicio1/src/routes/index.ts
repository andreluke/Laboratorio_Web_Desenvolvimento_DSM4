import { Router } from "express";
import person from "./person"
import phone from "./car"
import car from "./car"
import carbyperson from "./carbyperson"

const router = Router()

router.use("/person", person)
router.use("/phone", phone)
router.use("/car", car)
router.use("/carbyperson", carbyperson)

export default router