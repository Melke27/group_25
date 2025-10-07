const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
  relatedBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
});

module.exports = mongoose.model('Message', messageSchema);
