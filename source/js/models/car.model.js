const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
