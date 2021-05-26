const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

const PORT = 8080;

const authRouter = require('./routes/authRouter.js');
const postRouter = require('./routes/postRouter.js');
const userRouter = require('./routes/userRouter.js');

// ROUTES
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));