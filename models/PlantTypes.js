const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantname: {
        type: String,
        required: [true, 'Plant name is required']
    },
    description: {
        type: String,
        required: [true, 'Plant description is required']
    },
    type: {
        type: String,
        required: [true, 'Plant type is required']
    },
    image: {
        type: String,  // This will store the image URL/path
        required: [true, 'Plant image is required']
    },
    status: {
        type: String,
        required: [true, 'Plant status is required'],
        enum: ['Available', 'Not Available']
    },
    category: {
        type: String,
        required: [true, 'Plant category is required'],
        enum: ['indoor', 'outdoor', 'succulents']
    },
    price: {
        type: Number,
        required: [true, 'Plant price is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;
