const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  pname: {
    type: String,
    required: true
  },
  milliliters: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    default: 0,
    required: true
  }
});

// Ensure the model is only compiled once
module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
