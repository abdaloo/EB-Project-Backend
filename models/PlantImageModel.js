const mongoose = require('mongoose');

const plantImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PlantImage = mongoose.model('PlantImage', plantImageSchema);
module.exports = PlantImage;
