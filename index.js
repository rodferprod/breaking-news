const express = require('express');
const app = express();
const userRoute = require('./src/routes/user.route');

app.use(express.json())

const port = 3000;

app.use('/user', userRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));