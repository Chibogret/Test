// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to the request
    
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = auth;
