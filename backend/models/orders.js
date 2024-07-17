const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure the model is only compiled once
module.exports = mongoose.models.Order || mongoose.model('Orders', ordersSchema);
