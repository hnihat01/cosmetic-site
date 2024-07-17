const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
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
    favorite: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
