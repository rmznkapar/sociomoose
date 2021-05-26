const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// router.post('/upload', authMiddleware.isLoggedIn, postController.uploadPost)
router.post('/getProfile', authMiddleware.isLoggedIn, userController.getProfile)

router.post('/followUser', authMiddleware.isLoggedIn, userController.followUser)

module.exports = router;