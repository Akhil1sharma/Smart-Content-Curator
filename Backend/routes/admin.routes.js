const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// All admin routes require admin role
router.use(auth, role('admin'));

// Trigger n8n workflow
router.post('/workflow', adminController.triggerWorkflow);

// System analytics dashboard
router.get('/analytics', adminController.getSystemAnalytics);

// View/moderate all posts (with status filter)
router.get('/posts', adminController.getAllPosts);

module.exports = router;