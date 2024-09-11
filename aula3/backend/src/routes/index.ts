import { Router } from "express";
import user from "./user"

const routes = Router()

routes.use("/usuario", user);

export default routes