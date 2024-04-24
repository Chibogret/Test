const express = require('express');
const auth = require('../middleware/auth'); // Your authentication middleware
const Municipality = require('../models/Municipality'); // Adjust the path as necessary

const router = express.Router();

const createDummyData = async () => {
  const dummyMunicipality = new Municipality({
      name: "Springfield",
      checkpoint: {
          name: "Main Street Checkpoint",
          operationalStatus: "Active",
          timesOfActivity: "09:00 - 17:00"
      },
      asfStatus: "Monitoring",
      movementData: [
          {
              quantity: 120,
              origin: "Farm A",
              destination: "Market X",
              date: new Date() // Current date and time
          },
          {
              quantity: 75,
              origin: "Farm B",
              destination: "Processing Plant Y",
              date: new Date() // Current date and time
          }
      ],
      alerts: [
          {
              message: "Increased biosecurity measures required",
              severity: "High",
              date: new Date() // Current date and time
          }
      ],
      contactInfo: {
          veterinaryAuthority: {
              name: "Dr. Jane Doe",
              phoneNumber: "123-456-7890",
              email: "janedoe@example.com"
          },
          emergencyResponseTeam: {
              name: "Springfield Emergency Response",
              phoneNumber: "098-765-4321",
              email: "emergency@example.com"
          }
      }
  });

  try {
      const savedMunicipality = await dummyMunicipality.save();
      console.log('Dummy data saved successfully:', savedMunicipality);
  } catch (error) {
      console.error('Failed to save dummy data:', error);
  }
};

createDummyData();
// GET Municipality data by name with authentication
router.get('/get/:name', async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const municipality = await Municipality.findOne({ name: name }).exec();
    console.log(name)
    
    if (!municipality) {
      return res.status(404).json({ message: 'Municipality not found' });
    }
    
    // Now you can send back the municipality data
    res.json(municipality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/update/:name', async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const updateData = req.body; // Data to update the Municipality with

  try {
    const updatedMunicipality = await Municipality.findOneAndUpdate(
      { name: name }, // Filter document by name
      updateData, 
      { new: true, runValidators: true } // Options to return the updated document and run schema validators
    );
    if (!updatedMunicipality) {
      return res.status(404).send({ message: 'Municipality not found' });
    }
    res.status(200).send(updatedMunicipality);
  } catch (error) {
    res.status(500).send({ message: 'Failed to update Municipality', error: error.message });
  }
});


module.exports = router;
