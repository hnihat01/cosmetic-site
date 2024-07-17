const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.postRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, phoneNumber, birthday, gender } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password, phoneNumber, birthday, gender });

    await user.save();

    req.session.userId = user.id;
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    req.session.userId = user._id.toString();
    console.log('Login successful, session userId set to:', req.session.userId);

    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).send('Server error');
      }
      console.log('Session saved successfully, session:', req.session);
      res.json({ userId: req.session.userId });
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};



exports.getLogin = async (req, res) => {
};


// exports.postLogin= async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     req.session.userId = user.id;
//     console.log('Session User ID:', req.session.userId); // Debugging line
//     res.json({ msg: 'User logged in successfully' });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// }

exports.postLogout=(req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ msg: 'User logged out successfully' });
  });
}