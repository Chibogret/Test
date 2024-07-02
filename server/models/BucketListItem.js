// backend/models/BucketListItem.js
const mongoose = require('mongoose');

const BucketListItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('BucketListItem', BucketListItemSchema);
