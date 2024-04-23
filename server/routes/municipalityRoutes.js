const express = require('express');
const auth = require('../middleware/auth'); // Your authentication middleware
const Municipality = require('../models/Municipality'); // Adjust the path as necessary

const router = express.Router();

// // Create a new Municipality instance
// const newMunicipality = new Municipality({
//     name: "Calapan",
//     asfStatus: "No Cases",
//     checkpoints: [
//         {
//             name: "Main Gate",
//             operationalStatus: "Active",
//             timesOfActivity: "24/7"
//         },
//         {
//             name: "East Wing",
//             operationalStatus: "Under Maintenance",
//             timesOfActivity: "09:00 - 18:00"
//         }
//     ],
//     movementData: [
//         {
//             quantity: 150,
//             origin: "Factory A",
//             destination: "Warehouse B",
//             date: new Date('2024-04-22')
//         }
//     ],
//     alerts: [
//         {
//             message: "Regular inspection due",
//             date: new Date('2024-04-20')
//         }
//     ],
//     contactInfo: {
//         veterinaryAuthority: {
//             name: "Dr. Smith",
//             phoneNumber: "123-456-7890",
//             email: "dr.smith@example.com"
//         },
//         emergencyResponseTeam: {
//             name: "Emergency Team Alpha",
//             phoneNumber: "987-654-3210",
//             email: "emergency.alpha@example.com"
//         }
//     }
// });

// // Save the instance to MongoDB
// newMunicipality.save()
//     .then(doc => console.log("Document saved:", doc))
//     .catch(err => console.log("Error saving document:", err));

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

module.exports = router;
