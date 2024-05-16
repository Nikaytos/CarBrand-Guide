const express = require("express");
const mongoose = require("mongoose");
const Car = require("./source/js/models/car.model.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const carRoute = require("./source/js/routes/car.route.js");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", carRoute);

mongoose
  .connect(
    "mongodb+srv://admin:GFbGZwlEqh9qwCyK@carbrand.lgaowi2.mongodb.net/suggestions_db?retryWrites=true&w=majority&appName=CarBrand"
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
