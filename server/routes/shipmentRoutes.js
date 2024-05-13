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
      issuedBy
    } = req.body;

    console.log(req.body);

    const philippinesOffset = 8; // UTC+8 for Philippines
    const currentUtcTime = new Date(new Date().toUTCString()); // Simulate getting UTC time
    const philippinesTime = new Date(currentUtcTime.getTime() + (3600000 * philippinesOffset));
    const dateIssued = philippinesTime.toISOString().split('T')[0];
    const timeIssued = philippinesTime.toISOString();

    console.log("Date Issued: ", dateIssued);
    console.log("Time Issued: ", timeIssued);

    const municipalityOrder = ['PUERTO GALERA', 'SAN TEODORO', 'BACO', 'CALAPAN CITY', 'NAUJAN', 'VICTORIA', 'SOCORRO', 'POLA', 'PINAMALAYAN', 'GLORIA', 'BANSUD', 'BONGABONG', 'ROXAS', 'MANSALAY', 'BULALACAO'];
    const originIndex = municipalityOrder.findIndex(name => name === origin.toUpperCase());
    const destinationIndex = municipalityOrder.findIndex(name => name === destination.toUpperCase());

    let path;
    if (originIndex <= destinationIndex) {
      path = municipalityOrder.slice(originIndex, destinationIndex + 1);
    } else {
      path = municipalityOrder.slice(destinationIndex, originIndex + 1).reverse();
    }

    // Insert SOCORRO if POLA is origin or destination and PINAMALAYAN is in the timeline
    const polaIndex = path.indexOf('POLA');
    const pinamalayanIndex = path.indexOf('PINAMALAYAN');
    if (polaIndex !== -1 && pinamalayanIndex !== -1) {
      const socorroIndex = path.indexOf('SOCORRO');
      if (socorroIndex === -1) { // Only insert if SOCORRO isn't already in the path
        const insertIndex = Math.min(polaIndex, pinamalayanIndex) + 1;
        path.splice(insertIndex, 0, 'SOCORRO');
      }
    }

    if (origin.toUpperCase() !== 'POLA' && destination.toUpperCase() !== 'POLA') {
      path = path.filter(place => place !== 'POLA');
    }

    const timeline = path.map((name, index) => ({
      name,
      status: index === 0 ? 'current' : 'pending',
      time: '-',
      checkedby: '-',
      currentHeads: 0
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
      timeline,
      issuedBy
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
    const latestShipments = await ShipmentTracking.find()
      .sort({ timeIssued: -1 }) // Sort by createdAt in descending order (newest first)
      .limit(15);

    res.json(latestShipments);
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


router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { inspector, checkpointName, currentHeads } = req.body;

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

    // Update the status to 'completed' if it was 'completed (skipped)', otherwise proceed as usual
    if (shipment.timeline[selectedIndex].status === 'completed (skipped)') {
      shipment.timeline[selectedIndex].status = 'completed';
    } else if (selectedIndex >= currentIndex) {
      for (let index = currentIndex; index < selectedIndex; index++) {
        if (shipment.timeline[index].status !== 'completed (skipped)') {
          shipment.timeline[index].status = 'completed (skipped)';
        }
      }
      shipment.timeline[selectedIndex].status = 'completed';
    }


    const philippinesOffset = 8; // UTC+8 for Philippines

    // Assuming you fetch the current UTC time accurately from an online API:
    const currentUtcTime = new Date(new Date().toUTCString()); // Simulate getting UTC time

    // Convert UTC to Philippines time
    const philippinesTime = new Date(currentUtcTime.getTime() + (3600000 * philippinesOffset));

    // Extract the date and time in ISO format
    const dateIssued = philippinesTime.toISOString();

    shipment.timeline[selectedIndex].time = dateIssued;
    shipment.timeline[selectedIndex].checkedby = inspector;
    shipment.timeline[selectedIndex].currentHeads = currentHeads;

    // Do not update the status to 'current' for subsequent entries if they are completed (skipped)
    if (selectedIndex + 1 < shipment.timeline.length && shipment.timeline[selectedIndex + 1].status !== 'completed' && shipment.timeline[selectedIndex + 1].status !== 'completed (skipped)') {
      shipment.timeline[selectedIndex + 1].status = 'current';
    }

    // Update delivery status dates correctly
    if (shipment.deliveryStatus[1].date === '-') {
      shipment.deliveryStatus[1].date = dateIssued;
    }
    if (selectedIndex === shipment.timeline.length - 1) {
      shipment.deliveryStatus[2].date = dateIssued;
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

const moment = require('moment'); // Assuming moment.js is used for date manipulation

router.get('/dashboard-overview', async (req, res) => {
  try {
    const today = moment().startOf('day').toISOString(); // Start of today
    const tomorrow = moment().add(1, 'days').startOf('day').toISOString(); // Start of tomorrow

    // Fetching total number of shipments
    const totalShipments = await ShipmentTracking.countDocuments();

    // Aggregation pipeline for completed shipments and total livestock delivered
    const completedShipmentsDetails = await ShipmentTracking.aggregate([
      { $unwind: "$deliveryStatus" },
      {
        $match: {
          'deliveryStatus.state': 'delivered',
          'deliveryStatus.date': { $ne: "-" }
        }
      },
      {
        $project: {
          numberOfHeads: 1,
          dateIssued: { $dateFromString: { dateString: "$dateIssued" }},
          deliveryDate: { $dateFromString: { dateString: "$deliveryStatus.date" }}
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalDeliveredLivestock: { $sum: "$numberOfHeads" },
          totalDeliveryTime: { $sum: { $subtract: ["$deliveryDate", "$dateIssued"] }}
        }
      },
      {
        $project: {
          count: 1,
          totalDeliveredLivestock: 1,
          averageDeliveryTime: { $divide: ["$totalDeliveryTime", "$count"] }
        }
      }
    ]);

    // Fetching unique issuers for today
    const issuersToday = await ShipmentTracking.aggregate([
      {
        $match: {
          dateIssued: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: null,
          uniqueIssuers: { $addToSet: "$issuedBy" } // Using addToSet to ensure uniqueness
        }
      }
    ]);

    const uniqueIssuers = issuersToday.length > 0 ? issuersToday[0].uniqueIssuers : [];

    const totalCompleted = completedShipmentsDetails.length > 0 ? completedShipmentsDetails[0].count : 0;
    const totalDeliveredLivestock = completedShipmentsDetails.length > 0 ? completedShipmentsDetails[0].totalDeliveredLivestock : 0;
    const averageDeliveryTime = completedShipmentsDetails.length > 0 ? completedShipmentsDetails[0].averageDeliveryTime : 0;
    const totalActive = totalShipments - totalCompleted; // Calculate active shipments as total minus completed

    // Fetching total number of livestock across all shipments
    const livestockTotal = await ShipmentTracking.aggregate([
      {
        $group: {
          _id: null,
          totalHeads: { $sum: "$numberOfHeads" }
        }
      }
    ]);

    const totalLivestock = livestockTotal.length > 0 ? livestockTotal[0].totalHeads : 0;

    // Respond with a JSON object that includes all data
    res.json({
      totalShipments,
      activeShipments: totalActive,
      completedShipments: totalCompleted,
      totalLivestock,
      totalDeliveredLivestock,
      averageDeliveryTime: averageDeliveryTime / (1000 * 60 * 60 * 24), // Convert milliseconds to days
      issuersToday: uniqueIssuers
    });
  } catch (error) {
    res.status(500).send('Error fetching dashboard data: ' + error.message);
  }
});



module.exports = router;
