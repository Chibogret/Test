// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    console.error("No Authorization header provided");
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    // Assuming the token is prefixed with 'Bearer ', which should be checked
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to the request
    
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = auth;
