const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({status: 'UP'});
});

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
