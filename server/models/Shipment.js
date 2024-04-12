const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  livestockHandlerName: { type: String, required: true },
  plateNumber: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  numberOfHeads: { type: Number, required: true },
  dateIssued: { type: String, required: true }, // Consider using the Date type
  timeIssued: { type: String, required: true }, // Consider using the Date type for specific time formatting if necessary
  rasAsf: { type: String, required: true, unique: true }, // corrected path
  aic: { type: String, required: true, unique: true },
  deliveryStatus: [{
    description: { type: String, required: true },
    date: { type: String, required: true },
    state: { type: String, required: true }
  }],
  timeline: [{
    name: { type: String, required: true },
    status: { type: String, required: true },
    time: { type: String, required: true }
  }]
  // Add other relevant fields as needed
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
