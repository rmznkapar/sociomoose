const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/register', authMiddleware.validateRegister, authController.postRegister)

router.post('/login', authController.postLogin)

module.exports = router;