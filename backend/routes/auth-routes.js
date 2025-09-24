const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../models/user');
const { authenticateToken } = require('../middleware/auth-middleware');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokenUser = { userId: user._id, username: user.username };
    const token = jwt.sign(tokenUser, JWT_SECRET, { expiresIn: '24h' });

    const responseUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name
    };
    res.json({
      message: 'Login successful',
      token,
      user: responseUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error', data: error });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
