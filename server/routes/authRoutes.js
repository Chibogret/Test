const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Adjust the path as necessary
const router = express.Router();

require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

router.get('/protected-route', auth, (req, res) => {
// Only accessible if the user is authenticated
res.json({ msg: 'This is a protected route' });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Use email instead of username
    const user = await User.findOne({ email }); // Find user by email
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Authentication failed' });
    }
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;