// const route = require('express').Router(); // CommonJS
import { Router } from 'express';
const route = Router();

import userController from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middleware.js';

route.post("/", userController.create);

route.get("/", userController.findAll);

route.get("/:id", validId, validUser, userController.findById);

route.patch("/:id", validId, validUser, userController.update);

export default route;
