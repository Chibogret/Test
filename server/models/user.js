const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // Add other relevant fields as needed
});

// Hash password before saving
UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

module.exports = mongoose.model('Users', UserSchema);
