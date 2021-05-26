const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

// router.post('/upload', authMiddleware.isLoggedIn, postController.uploadPost)
router.post('/upload', authMiddleware.isLoggedIn, postController.uploadPost)

router.post('/getAll', authMiddleware.isLoggedIn, postController.getAllPosts)

router.post('/like', authMiddleware.isLoggedIn, postController.likePost)

module.exports = router;