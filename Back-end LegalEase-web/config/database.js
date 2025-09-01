const mongoose = require('mongoose');

// Hard-coded MongoDB URI (without .env)
const mongoURI = 'mongodb+srv://legalease:1219@legalease-cluster.bqanect.mongodb.net/LegaleaseDB?retryWrites=true&w=majority&appName=LegalEase-cluster';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
                  
    }); 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
