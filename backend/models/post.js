const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
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
    secondImage: {
        type: String,
        required: false // Optional second image
    },
    thirdImage: {
        type: String,
        required: false // Optional third image
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    secDes: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    aboutBrand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true // Adding category field
    }
});

module.exports = mongoose.model('Post', postSchema);
