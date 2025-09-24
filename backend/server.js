const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth-routes');
const taskRoutes = require('./routes/task-routes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Validate required environment variables
const PORT = process.env.PORT || 5001; // for the port we can use a default
const JWT_SECRET = process.env.JWT_SECRET;

// JWT secret key
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set. Please add it to your .env file.');
  process.exit(1);
}

// MongoDB connection uri
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set. Please add it to your .env file.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
