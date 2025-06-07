const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('MONGO_URI is not defined in your .env file');
    }
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
