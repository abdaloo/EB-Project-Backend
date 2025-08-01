const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const plant = require('../models/PlantTypes');
// Create Order
exports.createOrder = async (req, res) => {
    try {
        const {userId, products,  status ,quantity} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        const product = await plant.findById(products);
        if (!product) {
            return res.status(400).json({
                status: 'fail',
                message: 'Product not found'
            });
        }

            const TotalAmount = product.price*quantity;

        const order = await Order.create({
    customer: userId,
    products,
    total: TotalAmount,
    status,
    quantity
});


        if (!order) {
            return res.status(400).json({
                status: 'fail',
                message: 'Order not created'
            });
        }

        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer').populate('products');
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Get Order By Id
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer').populate('products');
        if (!order) {
            return res.status(400).json({
                status: 'fail',
                message: 'Order not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Update Order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('customer').populate('products');
        if (!order) {
            return res.status(400).json({
                status: 'fail',
                message: 'Order not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id).populate('customer').populate('products');
        if (!order) {
            return res.status(400).json({
                status: 'fail',
                message: 'Order not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: order
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
message: err
        });
    }
};