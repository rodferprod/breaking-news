import mongoose from "mongoose";
// const mongoose = require("mongoose"); // CommonJS

const connectDatabase = () => {
    console.log("Waiting for connection configuration...");

    mongoose.connect(
        process.env.MONGODB_ACCESS,
        { useNewUrlParser: true } // , useUnifieldTopology: true
    ).then(
        () => console.log("MongoDB Atlas Connected")
    ).catch(
        (error) => console.log('Erro de conexão:',error)
    )
}

export default connectDatabase
// module.exports = connectDatabase