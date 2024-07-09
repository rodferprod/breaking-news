import mongoose from "mongoose";
// const mongoose = require("mongoose"); // CommonJS
import userService from '../services/user.service.js';
// const userService = require('../services/user.service') // CommonJS

const validId = (req, res, next) => {
    try{
        const id = req.params.id;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({
                message: "Invalid Id"
            })
        }

        req.id = id

        next();
    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

const validUser = async (req, res, next) => {
    try{
        const id = req.id;
        const user = await userService.findByIdService(id);
        
        if (!user) {
            return res.status(400).send({
                message: "User not found"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

export {
    validId,
    validUser
};

// module.exports = {
//     validId,
//     validUser
// } CommonJS