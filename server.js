const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

const PORT = 8080;

const authRouter = require('./routes/authRouter.js');

// ROUTES
app.use('/api/auth', authRouter);

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));