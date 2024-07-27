import { Router } from 'express';
const route = Router();

import swaggwerUi from "swagger-ui-express"
import swaggerDocument from '../swagger.json' assert { type: "json" }

route.use("/", swaggwerUi.serve);
route.get("/", swaggwerUi.setup(swaggerDocument))

export default route;