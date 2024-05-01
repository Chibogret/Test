const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  municipality: {
    type: String,
    required: true,
    enum: ['San Teodoro', 'Calapan City', 'Puerto Galera', 'San Jose', 'Baco', 'Naujan', 'Victoria', 'Pola', 'Socorro', 'Pinamalayan', 'Gloria', 'Bansud', 'Bongabong', 'Roxas', 'Mansalay', 'Bulalacao'], // List of municipalities in Mindoro
    default: 'Calapan' // Default municipality
  },
  role: { type: String, required: true, default: 'user' }, // 'admin', 'user', etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
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
