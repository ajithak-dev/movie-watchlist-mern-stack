const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
}
module.exports = connectDB;


