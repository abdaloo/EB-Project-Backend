const monngoose = require('mongoose');

const plantFavouriteSchema = monngoose.Schema({
    plantId: {
        type: monngoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: true
    },
    userId: {
        type: monngoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const PlantFavourite = monngoose.model('PlantFavourite', plantFavouriteSchema);

module.exports = PlantFavourite;