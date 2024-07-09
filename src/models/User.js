import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// const mongoose = require("mongoose"); // CommonJS

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        avatar: {
            type: String,
            required: true,
        },
        background: {
            type: String,
            required: true,
        }
    }
);

UserSchema.pre("save", async function (next) {
    
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
});


const User = mongoose.model("User", UserSchema);

export default User;
// module.exports = User // CommonJS