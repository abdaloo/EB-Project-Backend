const express = require('express');
const router = express.Router();
const plantController = require('../controllers/PlantController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Plant:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The plant ID
 *         name:
 *           type: string
 *           description: Plant name
 *         type:
 *           type: string
 *           description: Plant type/category
 *         price:
 *           type: number
 *           description: Plant price
 *         description:
 *           type: string
 *           description: Plant description
 *         image:
 *           type: string
 *           description: Plant image URL
 *         inStock:
 *           type: boolean
 *           description: Whether plant is in stock
 *       example:
 *         id: 60c72b2f9b1e8e001c8e4b8c
 *         name: Monstera Deliciosa
 *         type: Indoor
 *         price: 29.99
 *         description: Beautiful tropical plant
 *         image: https://example.com/image.jpg
 *         inStock: true
 */

/**
 * @swagger
 * /api/v0/plants/uploadImage:
 *   post:
 *     summary: Upload plant image
 *     tags: [Plants]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Plant image file
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/uploadImage', plantController.uploadPlantImage);

/**
 * @swagger
 * /api/v0/plants/create:
 *   post:
 *     summary: Create a new plant
 *     tags: [Plants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Plant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plant:
 *                   $ref: '#/components/schemas/Plant'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/create', plantController.createPlant);

/**
 * @swagger
 * /api/v0/plants/getAll:
 *   get:
 *     summary: Get all plants
 *     tags: [Plants]
 *     responses:
 *       200:
 *         description: List of plants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Plant'
 */
router.get('/getAll', plantController.getAllPlants);

/**
 * @swagger
 * /api/v0/plants/getOne/{id}:
 *   get:
 *     summary: Get a specific plant by ID
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The plant ID
 *     responses:
 *       200:
 *         description: Plant found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plant:
 *                   $ref: '#/components/schemas/Plant'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Plant not found
 */
router.get('/getOne/:id', plantController.getPlant);

/**
 * @swagger
 * /api/v0/plants/update/{id}:
 *   put:
 *     summary: Update a plant by ID
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The plant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Plant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plant:
 *                   $ref: '#/components/schemas/Plant'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Plant not found
 */
router.put('/update/:id', plantController.updatePlant);

/**
 * @swagger
 * /api/v0/plants/delete/{id}:
 *   delete:
 *     summary: Delete a plant by ID
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The plant ID
 *     responses:
 *       200:
 *         description: Plant deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plant:
 *                   $ref: '#/components/schemas/Plant'
 *                 msg:
 *                   type: string
 *       404:
 *         description: Plant not found
 */
router.delete('/delete/:id', plantController.deletePlant);

module.exports = router;
