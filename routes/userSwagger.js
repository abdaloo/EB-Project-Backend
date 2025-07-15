const express = require('express');
const router = express.Router();
const { GetUserAll, CreateUser } = require('../controllers/UserController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         id: 60c72b2f9b1e8e001c8e4b8a
 *         name: John Doe
 *         email: john@example.com
 *         password: hashedpassword
 */

/**
 * @swagger
 * /api/v0/user/getUserAll:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/getUserAll', GetUserAll);

/**
 * @swagger
 * /api/v0/user/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *                 Token:
 *                   type: string
 */
router.post('/createUser', CreateUser);

/**
 * @swagger
 * /api/v0/user/getSpecificUser/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NewUser:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v0/user/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 DeletedUser:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v0/user/updateUser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 NewUser:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/v0/user/loginUser:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   $ref: '#/components/schemas/User'
 *                 msg:
 *                   type: string
 *                 Token:
 *                   type: string
 *       404:
 *         description: User not found
 *       402:
 *         description: Password is incorrect
 */

module.exports = router;
