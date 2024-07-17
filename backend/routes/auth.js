const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authController= require('../controllers/auth');
const router = express.Router();
//somesupersecretsecret
// Register a new user
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], authController.postRegister);

router.get('/register');


// Authenticate user and create session
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],authController.postLogin);

router.get('/login', authController.getLogin);

// Logout user and destroy session
router.post('/logout', authController.postLogout);

module.exports = router;
