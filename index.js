import express from 'express';
// const express = require('express'); // CommonJS

const app = express();

import dotenv from 'dotenv'

dotenv.config();

import connectDatabase from './src/database/db.js';
// const connectDatabase = require('./src/database/db') // CommonJS

import userRoute from './src/routes/user.route.js'
// const userRoute = require('./src/routes/user.route');  // CommonJS

app.use(express.json())


const port = 3000;

connectDatabase();

app.use('/user', userRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));