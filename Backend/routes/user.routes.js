const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// All user management routes require authentication
router.use(auth);

// Admin: list all users
router.get('/', role('admin'), userController.getAllUsers);

// Admin or self: get user by id
router.get('/:id', userController.getUserById);

// Admin or self: update user
router.put('/:id', userController.updateUser);

// Admin: disable user
router.delete('/:id', role('admin'), userController.deleteUser);

module.exports = router;