const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tourPackageId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  guests: { type: Number, required: true },
  tourDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
