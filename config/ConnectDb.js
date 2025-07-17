 const mongoose = require('mongoose');
 require('dotenv').config({ quiet: true });

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
       if(connect){
           console.log(`MongoDB connected successfully`);
       }else{
           console.log(`MongoDB connection failed`);
       }

    }catch(err){
        console.error('Error connecting to MongoDB:', err);
    }
}
module.exports = connectDB;