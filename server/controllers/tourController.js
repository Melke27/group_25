import Tour from '../models/Tour.js';

// Get all tours
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create tour
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update tour
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete tour
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
