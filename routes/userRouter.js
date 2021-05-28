const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// router.post('/upload', authMiddleware.isLoggedIn, postController.uploadPost)
router.post('/getProfile', authMiddleware.isLoggedIn, userController.getProfile)

router.post('/followUser', authMiddleware.isLoggedIn, userController.followUser)

router.post('/getFollowers', authMiddleware.isLoggedIn, userController.getFollowers)

router.post('/getFollowings', authMiddleware.isLoggedIn, userController.getFollowings)

router.post('/updateBio', authMiddleware.isLoggedIn, userController.updateBio)

module.exports = router;