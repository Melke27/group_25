const TourPackage = require('../models/tourPackage');

// Get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await TourPackage.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new tour
exports.createTour = async (req, res) => {
  try {
    const newTour = new TourPackage(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tour by ID
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a tour by ID
exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await TourPackage.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
