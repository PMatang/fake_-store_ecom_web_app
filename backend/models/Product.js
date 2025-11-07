const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  fakeId: Number,
  name: String,
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
