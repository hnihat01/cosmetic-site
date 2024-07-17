//routes/session.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Session ID:', req.sessionID); // Log the session ID
  console.log('Session data:', req.session); // Log the session data
    if ( req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ msg: 'No active session ' });
  }
});

module.exports = router;
