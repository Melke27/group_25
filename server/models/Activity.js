import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  time: String,
  user: String,
  status: String,
  relatedId: String
});

export default mongoose.model('Activity', activitySchema);
