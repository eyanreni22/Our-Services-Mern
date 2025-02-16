const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['customer', 'service provider','admin'], required: true },
  profilePic: String,
  address: String,
  serviceType: { type: String, enum: ['plumber', 'cleaner', 'electrician'], required: function() { return this.role === 'service_provider'; } },
  availableHours: { type: String }, // Optional
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

