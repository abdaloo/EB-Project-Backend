const express = require('express');
const router = express.Router();
const plantController = require('../controllers/PlantController');
const { upload } = require('../config/cloudinaryConfig');

router.post('/uploadImage', upload.single('image'), (req, res) => {
  res.json({
    message: 'Image uploaded successfully!',
    imageUrl: req.file.path,
  });
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
