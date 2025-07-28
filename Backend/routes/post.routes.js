const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// All post routes require authentication
router.use(auth);

// Create post
router.post('/', postController.createPost);

// List posts (admin: all, user: own)
router.get('/', postController.getPosts);

// Get single post
router.get('/:id', postController.getPostById);

// Update post
router.put('/:id', postController.updatePost);

// Delete post
router.delete('/:id', postController.deletePost);

// Admin: Approve/Reject post
router.post('/:id/review', role('admin'), postController.reviewPost);

module.exports = router;