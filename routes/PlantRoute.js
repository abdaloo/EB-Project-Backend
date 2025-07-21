const express = require('express');
const router = express.Router();
const plantController = require('../controllers/PlantController');
const { upload, uploadToCloudinary } = require('../config/cloudinaryConfig');

router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const result = await uploadToCloudinary(req.file);

    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});


// Plant Image routes
// router.post('/upload-image', plantController.uploadPlantImage);

// Plant routes
router.post('/create', plantController.createPlant);
router.get('/getAll', plantController.getAllPlants);
router.get('/getOne/:id', plantController.getPlant);
router.put('/update/:id', plantController.updatePlant);
router.delete('/delete/:id', plantController.deletePlant);

module.exports = router;
