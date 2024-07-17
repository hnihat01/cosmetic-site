// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

// Define route for adding products to cart
router.post('/products', cartController.postAddToCart);

router.get('/products',cartController.getAddToCart);

router.delete('/products/:productId', cartController.deleteProductById);

router.post('/products/qty/:productId',cartController.updateProductQuantity);

module.exports = router;
