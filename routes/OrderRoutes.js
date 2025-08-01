const express = require('express')
const router = express.Router()
const Order = require('../controllers/OrderConttoller')

/**
 * @swagger
 * /api/v0/orders/create/Order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - products
 *               - totalAmount
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user placing the order
 *               products:
 *                 type: string
 *                 description: The ID of the product being ordered
 *               totalAmount:
 *                 type: number
 *                 description: The total amount of the order
 *               status:
 *                 type: string
 *                 description: The status of the order
 *                 enum: [pending, completed, cancelled]
 *                 default: pending
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product being ordered
 *
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The order ID
 *                         userId:
 *                           type: string
 *                           description: The user ID
 *                         products:
 *                           type: string
 *                           description: The product ID
 *                         totalAmount:
 *                           type: number
 *                           description: The total amount of the order
 *                         status:
 *                           type: string
 *                           description: The status of the order
 *                         quantity:
 *                           type: number
 *                           description: The quantity of the product being ordered
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: Bad request - User not found or Product not found or Order creation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: User not found
 */
router.post('/create/Order', Order.createOrder)

// Get all orders
/**
 * @swagger
 * /api/v0/orders/get/all/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The order ID
 */
router.get('/get/all/orders', Order.getAllOrders)

// Get order by ID
/**
 * @swagger
 * /api/v0/orders/get/order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
*         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The order ID
 */
router.get('/get/order/:id', Order.getOrderById)

/**
 * @swagger
 * /api/v0/orders/update/order/{id}:
 *   put:
 *     summary: Update order quantity
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to update
 *         schema:
 *           type: string
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
 *                 description: The new quantity of the order
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The order ID
 *                         quantity:
 *                           type: number
 *                           description: The updated quantity of the order
 *       400:
 *         description: Bad request - Invalid quantity or Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Invalid quantity or Order not found
 */
router.put('/update/order/:id', Order.updateOrder)

// Delete order
/**
 * @swagger
 * /api/v0/orders/delete/order/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Order deleted successfully
 *       400:
 *         description: Bad request - Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Order not found
 */
router.delete('/delete/order/:id', Order.deleteOrder)
module.exports = router