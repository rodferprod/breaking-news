// const route = require('express').Router(); // CommonJS
import express from 'express';
const route = express.Router();

import userController from '../controllers/user.controller.js';
// const userController = require('../controllers/user.controller'); // CommonJS
import { validId, validUser } from '../middlewares/global.middleware.js';
// const { validId, validUser } = require("../middlewares/global.middleware"); // CommonJS

route.post("/", userController.create);

route.get("/", userController.findAll);

route.get("/:id", validId, validUser, userController.findById);

route.patch("/:id", validId, validUser, userController.update);

export default route;
// module.exports = route; // CommonJS