const passengerService = require('../services/passengerService');

exports.getAllPassengers = async (req, res) => {
  try {
    const passengers = await passengerService.findAll();
    res.json(passengers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPassengerById = async (req, res) => {
  try {
    const passenger = await passengerService.findById(req.params.id);
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });
    res.json(passenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPassenger = async (req, res) => {
  try {
    const newPassenger = await passengerService.create(req.body);
    res.status(201).json(newPassenger);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassenger = async (req, res) => {
  try {
    const updated = await passengerService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Passenger not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePassenger = async (req, res) => {
  try {
    const deleted = await passengerService.remove(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};