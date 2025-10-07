const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, required: true },
  relatedId: { type: String, required: true }
});

module.exports = mongoose.model('Activity', activitySchema);