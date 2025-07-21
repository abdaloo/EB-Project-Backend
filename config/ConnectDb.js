 const mongoose = require('mongoose');
 require('dotenv').config({ quiet: true });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log( `MongoDB successfully connected to Server`);
    } catch (err) {
        console.error(' MongoDB connection error:', err.message);
        process.exit(1); // Optional: crash the app if DB fails
    }
};

module.exports = connectDB;