const express = require('express');
const router = express.Router();
const plantController = require('../controllers/PlantController');
const Cart = require('../controllers/PlantController');
const PlantFavourite = require('../controllers/PlantController');
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

//Add to cart
/**
 *
 * @swagger
 * /api/v0/plants/addToCart:
 *   post:
 *     summary: Add plant to cart
 *     tags: [Add to Cart Plant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plantId
 *               - quantity
 *               - userId
 *               - price
 *             properties:
 *               plantId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               userId:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Plant added to cart successfully
 *       400:
 *         description: Plant ID and quantity are required
 *       404:
 *         description: Plant not found
 *       500:
 *         description: Error adding plant to cart
 *
 *
 */
router.post('/addToCart', Cart.AddToCart);

// Get cart plants
/**
 * @swagger
 * /api/v0/plants/getCart/{userId}:
 *   get:
 *     summary: Get cart plants
 *     tags: [Add to Cart Plant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Cart plants retrieved successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: No cart plants found
 *       500:
 *         description: Error retrieving cart plants
 */
router.get('/getCart/:userId', Cart.getCartPlants);


// Remove from cart
/**
 * @swagger
 * /api/v0/plants/removeFromCart/{userId}/{plantId}:
 *   delete:
 *     summary: Remove plant from cart
 *     tags: [Add to Cart Plant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The plant ID
 *     responses:
 *       200:
 *         description: Plant removed from cart successfully
 *       400:
 *         description: User ID and plant ID are required
 *       404:
 *         description: Plant not found in cart
 *       500:
 *         description: Error removing plant from cart
*/
router.delete('/removeFromCart/:userId/:plantId', Cart.deleteCartPlant );

// update cart plant quantity
/**
 * @swagger
 * /api/v0/plants/updateCart/{userId}/{plantId}:
 *   put:
 *     summary: Update cart plant quantity
 *     tags: [Add to Cart Plant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: plantId
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
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Cart plant quantity updated successfully
 *       400:
 *         description: User ID, plant ID, and quantity are required
 *       404:
 *         description: Plant not found in cart
 *       500:
 *         description: Error updating cart plant quantity
 */
router.put('/updateCart/:userId/:plantId', Cart.updateCartPlant);

// Add to favourite
/**
 * @swagger
 * /api/v0/plants/addToFavourite:
 *   post:
 *     summary: Add plant to favourite
 *     tags: [Add to Favourite Plant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plantId
 *               - userId
 *             properties:
 *               plantId:
*                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plant added to favourite successfully
 *       400:
 *         description: Plant ID and user ID are required
 *       404:
 *         description: Plant not found
 *       500:
 *         description: Error adding plant to favourite
 */
router.post('/addToFavourite', PlantFavourite.addToFavorite);

// Get favourite
/**
 * @swagger
 * /api/v0/plants/getFavourite/{userId}:
 *   get:
 *     summary: Get favourite plants
 *     tags: [Add to Favourite Plant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
*         description: Favourite plants retrieved successfully
 *       400:
 *         description: User ID is required
 *       404:
 *         description: No favourite plants found
 *       500:
 *         description: Error retrieving favourite plants
 */
router.get('/getFavourite/:userId', PlantFavourite.getFavoritePlants);

//delete favourite
/**
 * @swagger
 * /api/v0/plants/deleteFavourite/{userId}/{plantId}:
 *   delete:
 *     summary: Delete favourite plant
 *     tags: [Add to Favourite Plant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The plant ID
 *     responses:
 *       200:
 *         description: Favourite plant deleted successfully
 *       400:
 *         description: User ID and plant ID are required
 *       404:
 *         description: Plant not found in favourite
 *       500:
 *         description: Error deleting favourite plant
 */
router.delete('/deleteFavourite/:userId/:plantId', PlantFavourite.deleteFavoritePlant);
module.exports = router;
