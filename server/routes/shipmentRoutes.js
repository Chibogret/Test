const express = require('express');
const ShipmentTracking = require('../models/Shipment'); // Ensure the path matches the location of your model file

const router = express.Router();
require('dotenv').config();

router.post('/register-shipment', async (req, res) => {
  try {
    const {
      livestockHandlerName,
      plateNumber,
      origin,
      destination,
      numberOfHeads,
      rasAsfControlNumber,
      aicControlNumber,
    } = req.body;

    console.log(req.body);

    const currentDate = new Date();
    const dateIssued = currentDate.toISOString().split('T')[0];
    const timeIssued = currentDate.toTimeString().split(' ')[0];

    const municipalityOrder = ['PUERTO GALERA', 'SAN TEODORO', 'BACO', 'CALAPAN CITY', 'NAUJAN', 'VICTORIA', 'SOCORRO', 'POLA', 'PINAMALAYAN', 'GLORIA', 'BANSUD', 'BONGABONG', 'ROXAS', 'MANSALAY', 'BULALACAO'];

    // Find indexes of origin and destination
    const originIndex = municipalityOrder.findIndex(name => name === origin.toUpperCase());
    const destinationIndex = municipalityOrder.findIndex(name => name === destination.toUpperCase());

    // Determine the direction and slice the array accordingly
    let path;
    if (originIndex <= destinationIndex) {
      // If destination is after origin in the list
      path = municipalityOrder.slice(originIndex, destinationIndex + 1);
    } else {
      // If origin is after the destination, implying a reverse path
      path = municipalityOrder.slice(destinationIndex, originIndex + 1).reverse();
    }

    const timeline = path.map(name => ({
      name,
      status: 'completed',
      time: '-'
    }));

    const newShipment = new ShipmentTracking({
      livestockHandlerName,
      plateNumber,
      origin,
      destination,
      numberOfHeads,
      dateIssued,
      timeIssued,
      rasAsf: rasAsfControlNumber,
      aic: aicControlNumber,
      deliveryStatus: [
        { description: 'Checking', date: timeIssued, state: 'checking' },
        { description: 'In Transit', date: '-', state: 'inTransit' },
        { description: 'Delivering', date: '-', state: 'delivering' }
      ],
      timeline
    });

    await newShipment.save();
    res.status(201).send({ message: 'Shipment created successfully' });
  } catch (error) {
    console.error('Error registering shipment:', error);
    res.status(500).send({ message: error.message });
  }
});


router.get('/get', async (req, res) => {
  try {
    // Assuming you want to return all orders, but you might want to add query parameters
    const shipments = await ShipmentTracking.find(); // Fetch all order details from your database
    res.json(shipments); // Send the order details as JSON
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});

module.exports = router;
