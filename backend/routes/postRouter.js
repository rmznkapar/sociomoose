const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

// router.post('/upload', authMiddleware.isLoggedIn, postController.uploadPost)
router.post('/upload', authMiddleware.isLoggedIn, postController.uploadPost)

router.post('/getAll', authMiddleware.isLoggedIn, postController.getAllPosts)

router.post('/getSpec', authMiddleware.isLoggedIn, postController.getSpecPost)

router.post('/like', authMiddleware.isLoggedIn, postController.likePost)

router.post('/makeComment', authMiddleware.isLoggedIn, postController.makeComment)

router.post('/getComments', authMiddleware.isLoggedIn, postController.getComments)

router.post('/deletePost', authMiddleware.isLoggedIn, postController.deletePost)

module.exports = router;