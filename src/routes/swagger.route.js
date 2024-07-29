import { Router } from 'express';
import swaggwerUi from "swagger-ui-express"
import swaggerDocument from '../swagger.json' assert { type: "json" }

const swaggweRouter = Router();

swaggweRouter.use("/", swaggwerUi.serve);
swaggweRouter.get("/", swaggwerUi.setup(swaggerDocument))

export default swaggweRouter;