const Plant = require('../models/PlantTypes');
const PlantImage = require('../models/PlantImageModel');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/plants/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('image');

// Upload plant image
exports.uploadPlantImage = async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Please upload an image' });
            }

            const plantImage = new PlantImage({
                filename: req.file.filename,
                path: req.file.path
            });

            await plantImage.save();

            res.status(201).json({
                message: 'Image uploaded successfully',
                image: plantImage
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
};

// Create new plant
exports.createPlant = async (req, res) => {
    try {
        const { plantname, description, type, image, status, category, price } = req.body;

        // Validate input
        if (!plantname || !description || !type || !image || !status || !category || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const plant = new Plant({
            plantname,
            description,
            type,
            image,
            status,
            category,
            price
        });

        await plant.save();

        res.status(201).json({
            message: 'Plant created successfully',
            plant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating plant', error: error.message });
    }
};

// Get all plants
exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json({
            message: 'Plants fetched successfully',
            plants
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plants', error: error.message });
    }
};

// Get single plant
exports.getPlant = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json({
            message: 'Plant fetched successfully',
            plant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plant', error: error.message });
    }
};

// Update plant
exports.updatePlant = async (req, res) => {
    try {
        const plant = await Plant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json({
            message: 'Plant updated successfully',
            plant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating plant', error: error.message });
    }
};

// Delete plant
exports.deletePlant = async (req, res) => {
    try {
        const plant = await Plant.findByIdAndDelete(req.params.id);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
        res.status(200).json({
            message: 'Plant deleted successfully',
            plant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plant', error: error.message });
    }
};
