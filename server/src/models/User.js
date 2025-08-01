const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple User Schema - Perfect for College Projects
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Hash password before saving - Simple security
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  // Hash password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Simple method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
