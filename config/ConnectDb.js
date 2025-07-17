 const mongoose = require('mongoose');
 require('dotenv').config({ quiet: true });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // const conn = await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });

        console.log( `MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(' MongoDB connection error:', err.message);
        process.exit(1); // Optional: crash the app if DB fails
    }
};

module.exports = connectDB;