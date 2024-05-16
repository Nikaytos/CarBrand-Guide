const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of brand is required"],
    },
    logo: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    links_on_sources: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
