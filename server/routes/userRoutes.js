const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Existing /home route
router.get('/home', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.json({ msg: 'User profile page', email: user.email });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/userinfo', auth, async (req, res) => {
  try {
    // Use the user ID stored in req.user after authentication
    const user = await User.findById(req.user.id).select('email firstName lastName municipality role');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log(user)
    // Extracting and sending necessary information
    const { email, firstName, lastName, municipality, role } = user;
    res.json({
      message: 'User Information',
      email,
      firstName,
      lastName,
      municipality,
      role
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



// More user-specific routes here

module.exports = router;
