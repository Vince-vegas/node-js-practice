const mongoose = require('mongoose');

const fieldChecker = (name) => `Product must have a ${name}`;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, fieldChecker('name')],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, fieldChecker('price')],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  stock: {
    type: Number,
    required: [true, fieldChecker('stock')],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
