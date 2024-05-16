const Car = require("../models/car.model.js");

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const putCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const updatedCar = await Car.findById(id);
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCars, getCar, postCar, putCar, deleteCar };
