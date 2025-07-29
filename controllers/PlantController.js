const Plant = require('../models/PlantTypes');
const { upload, uploadToCloudinary } = require('../config/cloudinaryConfig');

// Upload plant image to Cloudinary
exports.uploadPlantImage = async (req, res) => {
    try {
        upload.single('image')(req, res, async function(err) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No image file provided' });
            }

            // Validate PNG extension (case-insensitive)
            const fileName = req.file.originalname || req.file.filename;
            if (!fileName || !/\.png$/i.test(fileName)) {
                return res.status(400).json({ message: 'Only PNG images are allowed (png or PNG extension)' });
            }

            try {
                const result = await uploadToCloudinary(req.file);
                res.status(201).json({
                    status:201,
                    message: 'Image uploaded successfully',
                    imageUrl: result.secure_url,
                });
            } catch (cloudErr) {
                console.error('Upload Error:', cloudErr);
                res.status(500).json({ message: 'Upload failed', error: cloudErr.message });
            }
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
            status:201,
            message: 'Plant created successfully',
            data:plant
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
            status: 200,
            message: 'Plants fetched successfully',
            data:plants
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
            status:200,
            message: 'Plant fetched successfully',
            data:plant
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
            status:200,
            message: 'Plant updated successfully',
            data:plant
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
            status:200,
            message: 'Plant deleted successfully',
            data:plant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plant', error: error.message });
    }
};
