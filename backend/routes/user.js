// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to fetch user data by ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is undefined' });
    }
    if(userId){
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    }
   
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
