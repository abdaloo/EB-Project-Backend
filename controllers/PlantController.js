const Plant = require('../models/PlantTypes');
const { upload, uploadToCloudinary } = require('../config/cloudinaryConfig');
const AddToCart = require('../models/PlantCart');
const User = require('../models/UserModel');
const Favorite = require('../models/PlantFavourite');
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

// Add plant to cart
exports.AddToCart = async (req, res) => {
    try {
        const { plantId, quantity,userId,price } = req.body;
        const user = await User.findById(userId);

        console.log(user.name,userId,plantId,quantity,user.email,price);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate input
        if (!plantId || !quantity||!userId||!price) {
            return res.status(400).json({ message: 'Plant ID ,userId,price and quantity are required' });
        }
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }
        if (price <= 0) {
            return res.status(400).json({ message: 'Price must be greater than 0' });
        }


        // Check if plant exists
        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
         const Price = price * quantity;

        const cart = new AddToCart({
            plantId,
            quantity,
            userId,
            price:Price
        });

        await cart.save();

        res.status(201).json({
            status:201,
            message: 'Plant added to cart successfully',
            data:cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding plant to cart', error: error.message });
    }
};

// Get all cart plants
exports.getCartPlants = async (req, res) => {
    try {
        const cartPlants = await AddToCart.find({ userId: req.params.userId }).populate('plantId');
        res.status(200).json({
            status:200,
            message: 'Cart plants fetched successfully',
            data:cartPlants
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart plants', error: error.message });
    }
};

// Delete cart plant
exports.deleteCartPlant = async (req, res) => {
    try {
        const {userId,plantId} = req.params;
        const cartPlant = await AddToCart.findOneAndDelete({userId,plantId}).populate('plantId');
        if (!cartPlant) {
            return res.status(404).json({ message: 'Cart plant not found' });
        }
        res.status(200).json({
            status:200,
            message: 'Cart plant deleted successfully',
            data:cartPlant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart plant', error: error.message });
    }
};

// Update cart plant
exports.updateCartPlant = async (req, res) => {
    try {
        const {userId,plantId} = req.params;
        const cartPlant = await AddToCart.findOneAndUpdate({userId,plantId},req.body,{ new: true, runValidators: true }).populate('plantId');
        if (!cartPlant) {
            return res.status(404).json({ message: 'Cart plant not found' });
        }
        res.status(200).json({
            status:200,
            message: 'Cart plant updated successfully',
            data:cartPlant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart plant', error: error.message });
    }
};

// Add to favorite
exports.addToFavorite = async (req, res) => {
    try {
        const { plantId,userId } = req.body;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate input
        if (!plantId || !userId) {
            return res.status(400).json({ message: 'Plant ID and userId are required' });
        }

        // Check if plant exists
        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }

        const favorite = new Favorite({
            plantId,
            userId
        });

        await favorite.save();

        res.status(201).json({
            status:201,
            message: 'Plant added to favorite successfully',
            data:favorite
        });
} catch (error) {
        res.status(500).json({ message: 'Error adding plant to favorite', error: error.message });
    }
};
// Get all favorite plants
exports.getFavoritePlants = async (req, res) => {
    try {
        const favoritePlants = await Favorite.find({ userId: req.params.userId }).populate('plantId');
        res.status(200).json({
            status:200,
            message: 'Favorite plants fetched successfully',
            data:favoritePlants
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite plants', error: error.message });
    }
};

// Delete favorite plant
exports.deleteFavoritePlant = async (req, res) => {
    try {
        const {userId,plantId} = req.params;
        const favoritePlant = await Favorite.findOneAndDelete({userId,plantId}).populate('plantId');
        if (!favoritePlant) {
            return res.status(404).json({ message: 'Favorite plant not found' });
        }
        res.status(200).json({
            status:200,
            message: 'Favorite plant deleted successfully',
            data:favoritePlant
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting favorite plant', error: error.message });
    }
};
