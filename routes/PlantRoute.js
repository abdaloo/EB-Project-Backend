const express = require('express');
const router = express.Router();
const plantController = require('../controllers/PlantController');

// Plant Image routes
router.post('/uploadImage', plantController.uploadPlantImage);

// Plant routes
router.post('/create', plantController.createPlant);
router.get('/getAll', plantController.getAllPlants);
router.get('/getOne/:id', plantController.getPlant);
router.put('/update/:id', plantController.updatePlant);
router.delete('/delete/:id', plantController.deletePlant);

module.exports = router;
