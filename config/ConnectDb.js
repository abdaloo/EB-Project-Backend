 const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI||'mongodb+srv://Ebpro:Hello123@cluster0.aisosva.mongodb.net/EbProject';
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(dbURI);
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