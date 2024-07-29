// const route = require('express').Router(); // CommonJS
import { Router } from 'express';
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";


const userRouter = Router();

userRouter.post("/", userController.createUserController);

userRouter.use(authMiddleware);

userRouter.get("/", userController.findAllUserController);

userRouter.use(validId);

userRouter.get("/:id", userController.findByIdUserController);
userRouter.patch("/:id", userController.updateUserController);

export default userRouter;
