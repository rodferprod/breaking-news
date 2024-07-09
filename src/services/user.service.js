import User from "../models/User.js";
// const User = require("../models/User"); // CommonJS

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => User.findOneAndUpdate(
    { _id: id },
    {
        name, username, email, password, avatar, background
    }
);

export default {
    createService,
    findAllService,
    findByIdService,
    updateService
}

// module.exports = {
//     createService,
//     findAllService,
//     findByIdService,
//     updateService
// } // CommonJS