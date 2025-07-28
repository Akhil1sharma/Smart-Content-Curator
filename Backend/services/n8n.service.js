const axios = require('axios');

exports.triggerWorkflow = async (workflowName, params = {}) => {
  // n8n webhook URL mapping for each workflow
  const webhooks = {
    weeklyDigest: process.env.N8N_WEEKLY_DIGEST_WEBHOOK,
    draftReminder: process.env.N8N_DRAFT_REMINDER_WEBHOOK,
    // Add other workflow webhooks as needed
  };
  const url = webhooks[workflowName];
  if (!url) throw new Error('Unknown workflow');
  const response = await axios.post(url, params);
  return response.data;
};