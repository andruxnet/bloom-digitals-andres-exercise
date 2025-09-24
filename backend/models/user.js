const mongoose = require('mongoose');

const { hashPassword, comparePassword } = require('../services/password-service');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = async function(comparedPassword) {
  if (!this.password || !comparedPassword) {
    return false;
  }
  return comparePassword(comparedPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;