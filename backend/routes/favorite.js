const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite');
const isAuthenticated = require('../middleware/authMiddleware'); // Adjust the path as needed

// Route to add a product to favorites
router.post('/products', isAuthenticated, favoriteController.postFavorites);

router.get('/products',isAuthenticated, favoriteController.getFavourites);

router.get('/products/:productId', favoriteController.getFavourite);

module.exports = router;
