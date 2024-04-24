const express = require("express");
const mongoose = require("mongoose");
const Car = require("./source/js/models/car.model.js");
const carRoute = require("./source/js/routes/car.route.js");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/cars", carRoute);

mongoose
  .connect(
    "mongodb+srv://admin:GFbGZwlEqh9qwCyK@carbrand.lgaowi2.mongodb.net/?retryWrites=true&w=majority&appName=CarBrand"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}. . .`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.delete("/api/cars/:id", async (req, res) => {
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
});
