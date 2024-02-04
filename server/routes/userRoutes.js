const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User'); // Adjust the path as necessary
// Other imports as necessary
const router = express.Router();

router.get('/home', auth, async (req, res) => {
  try {
    // Use req.user.id to retrieve user info from the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    // Now you can send back the email or any other information you need
    res.json({ msg: 'User profile page', email: user.email });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


  

// More user-specific routes here

module.exports = router;
