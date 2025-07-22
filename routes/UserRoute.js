const exp = require('express');
const router = exp.Router();
const { CreateUser,LoginUser,UpdateUser,DeleteUser,GetUserAll,GetSpecificUser } = require('../controllers/UserController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         id: 60c72b2f9b1e8e001c8e4b8a
 *         name: John Doe
 *         email: john@example.com
 *         password: hashedpassword
 */

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
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
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
 *       400:
 *         description: Bad request
 */
router.post('/createUser', CreateUser);

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
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
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
router.post('/loginUser', LoginUser);

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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
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
router.put('/updateUser/:id', UpdateUser);

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
router.delete('/deleteUser/:id', DeleteUser);

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
 * /api/v0/user/getSpecificUser/{email}:
 *   get:
 *     summary: Get a specific user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The user email
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
router.get('/getSpecificUser/:email', GetSpecificUser);

module.exports = router;