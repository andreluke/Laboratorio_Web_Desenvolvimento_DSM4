import { Router } from "express";
import states from "./states"
import cities from "./cities"
import districts from "./districts"

const routes = Router()

routes.use("/estado", states);
routes.use("/cidade", cities);
routes.use("/distrito", districts);

export default routes