const isAuthenticated = (req, res, next) => {
  console.log('Checking authentication, session:', req.session);
  console.log('Session ID:', req.sessionID);

  const userId = req.session.userId;
  console.log('Authenticated userId:', userId);

  if (!userId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  req.userId = userId;
  console.log('Authenticated userId passed to request:', req.userId);

  next();
};

module.exports = isAuthenticated;
