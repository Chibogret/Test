const express = require('express');
const mongoose = require('mongoose');
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
    const timeIssued = currentDate.toISOString();

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

    const timeline = path.map((name, index) => ({
      name,
      status: index === 0 ? 'current' : 'pending', // Use ternary operator to check index
      time: '-',
      checkedby: '-'
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
        { description: 'Delivered', date: '-', state: 'delivered' }
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

router.get('/search', async (req, res) => {
  const searchQuery = req.query.search;

  let queryConditions = [];

  if (searchQuery) {
    // General text search conditions
    queryConditions = [
      { origin: { $regex: searchQuery, $options: 'i' } },
      { destination: { $regex: searchQuery, $options: 'i' } },
      { livestockHandlerName: { $regex: searchQuery, $options: 'i' } },
      { plateNumber: { $regex: searchQuery, $options: 'i' } },
      { rasAsf: { $regex: searchQuery, $options: 'i' } },
      { aic: { $regex: searchQuery, $options: 'i' } },
      { 'deliveryStatus.description': { $regex: searchQuery, $options: 'i' } },
      { 'deliveryStatus.state': { $regex: searchQuery, $options: 'i' } },
      { 'timeline.name': { $regex: searchQuery, $options: 'i' } },
      { 'timeline.status': { $regex: searchQuery, $options: 'i' } },
      { 'timeline.checkedby': { $regex: searchQuery, $options: 'i' } }
    ];

    // Check if searchQuery is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(searchQuery)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(searchQuery) });
    }
  }

  try {
    let shipments;
    if (queryConditions.length > 0) {
      shipments = await ShipmentTracking.find({ $or: queryConditions }).sort({ _id: -1 }).limit(20);
    } else {
      // If no search parameters, return the 20 most recent shipments
      shipments = await ShipmentTracking.find({}).sort({ _id: -1 }).limit(20);
    }

    res.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).send('Error fetching shipment data');
  }
});



router.get('/get/:id', async (req, res) => {
  const { id } = req.params;  // Extract the id from the request parameters
  try {
    const shipment = await ShipmentTracking.findById(id);  // Find the shipment by id in the database
    if (shipment) {
      res.json(shipment);  // Send the shipment details as JSON
    } else {
      res.status(404).json({ message: 'Shipment not found.' });  // Send a 404 response if no shipment is found
    }
  } catch (error) {
    console.error('Error fetching shipment:', error);
    res.status(500).json({ message: 'Failed to fetch shipment.' });  // Handle possible errors in fetching from the database
  }
});


router.get('/latest', async (req, res) => {
  try {
    // Assuming 'createdAt' is the timestamp field used to store entry creation time
    const latestShipments = await ShipmentTracking.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
      .limit(5); // Limit the results to the 5 latest entries

    res.json(latestShipments); // Send the latest order details as JSON
  } catch (error) {
    console.error('Error fetching latest orders:', error);
    res.status(500).json({ message: 'Failed to fetch latest orders.' });
  }
});


router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ warning: 'No token found. Please log in.' });
  }

  try {
    const shipment = await ShipmentTracking.findById(id);
    if (!shipment) {
      return res.status(404).json({ warning: 'Shipment not found.' });
    }

    const response = {
      orderDetails: {
        livestockHandlerName: shipment.livestockHandlerName,
        plateNumber: shipment.plateNumber,
        origin: shipment.origin,
        destination: shipment.destination,
        numberOfHeads: shipment.numberOfHeads,
        dateIssued: shipment.dateIssued,
        timeIssued: shipment.timeIssued,
        rasAsf: shipment.rasAsf,
        aic: shipment.aic,
        timeline: shipment.timeline
      },
      deliveryStatus: shipment.deliveryStatus,
    };

    console.log(response)

    res.json(response);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/update-shipment/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // All updated fields are expected to be in the request body

  try {
    // Find the shipment by ID and update it
    const updatedShipment = await Shipment.findByIdAndUpdate(id, {
      $set: updateData
    }, { new: true }); // "new: true" ensures the method returns the document after update

    if (!updatedShipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json({
      message: 'Shipment updated successfully',
      data: updatedShipment
    });
  } catch (error) {
    console.error('Update shipment error:', error);
    res.status(500).json({ message: 'Failed to update shipment' });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { inspector, checkpointName } = req.body;

  try {
    const shipment = await ShipmentTracking.findById(id);
    if (!shipment) {
      return res.status(404).send('Shipment not found');
    }

    const currentIndex = shipment.timeline.findIndex(item => item.status === 'current');
    const selectedIndex = shipment.timeline.findIndex(item => item.name === checkpointName);



    console.log(selectedIndex);
    console.log(checkpointName);
    console.log(currentIndex);

    if (selectedIndex === -1) {
      return res.status(404).send('Checkpoint not found');
    }

    // Update all statuses up to and including the selected checkpoint
    if (selectedIndex >= currentIndex) {
      for (let index = currentIndex; index < selectedIndex; index++) {
        shipment.timeline[index].status = 'completed (skipped)';
      }
      shipment.timeline[selectedIndex].status = 'completed';
    }

    shipment.timeline[selectedIndex].time = new Date().toISOString(); // Setting current time for completed items
    shipment.timeline[selectedIndex].checkedby = inspector;

    // Set the next status to current if there's another timeline entry
    if (selectedIndex + 1 < shipment.timeline.length) {
      shipment.timeline[selectedIndex + 1].status = 'current';
    } 
    
    // Correct the comparison operator to '==='
if (shipment.deliveryStatus[1].date === '-') {
  shipment.deliveryStatus[1].date = new Date().toISOString();
}

// Similarly, ensure the operation for the last timeline index uses the correct date setting
if (selectedIndex === shipment.timeline.length - 1) {
  shipment.deliveryStatus[2].date = new Date().toISOString();
}

    

    await shipment.save();
    res.status(200).json({
      message: 'Shipment updated successfully',
      data: shipment
    });
  } catch (error) {
    console.error('Error updating shipment:', error);
    res.status(500).json({
      message: 'Error updating shipment',
      error: error.message
    });
  }
});


module.exports = router;
