// routes/order.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');

router.post('/', ordersController.placeOrder);

router.get('/products', ordersController.getOrderWithProducts);

module.exports = router;
