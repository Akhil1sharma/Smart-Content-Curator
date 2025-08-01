const User = require('../models/user.model');
const Post = require('../models/post.model');
const n8nService = require('../services/n8n.service');
const analyticsService = require('../services/analytics.service');

exports.triggerWorkflow = async (req, res) => {
  try {
    const { workflowName, params } = req.body; 
    const result = await n8nService.triggerWorkflow(workflowName, params);
    res.json({ message: 'Workflow triggered', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSystemAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ status: 'published' });
    const scheduledPosts = await Post.countDocuments({ status: 'scheduled' });
   
    res.json({
      totalUsers,
      totalPosts,
      publishedPosts,
      scheduledPosts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const posts = await Post.find(filter).populate('author', 'name email role').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnalyticsReport = async (req, res) => {
  try {
    const report = await analyticsService.getWeeklyAnalytics();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};