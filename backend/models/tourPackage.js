const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  images: [String],
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);