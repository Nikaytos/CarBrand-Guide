const express = require("express");
const Car = require("../models/car.model.js");
const router = express.Router();
const {
  getCars,
  getCar,
  postCar,
  putCar,
  deleteCar,
} = require("../controllers/car.controller.js");

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", postCar);
router.put("/:id", putCar);
router.delete("/:id", deleteCar);

module.exports = router;
