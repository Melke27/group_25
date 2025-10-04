import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  subject: String,
  message: String,
  status: { type: String, default: 'unread' },
  relatedBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
