const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  priceNaira: Number,
  image: String,
  ratings: {
    stars: Number,
    count: Number
  }
});

module.exports = mongoose.model("Product", productSchema);