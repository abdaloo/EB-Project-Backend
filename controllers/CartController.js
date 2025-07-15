const Cart = require('../models/CartModel');

exports.AddToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId) {
            return res.status(400).send({ msg: 'User ID and Product ID are required' });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart =  await  Cart.create({ userId, products: [] });

        }


        const existingProduct = cart.products.find(p => p.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }


        cart.totalPrice = cart.products.reduce((total, item) => total + (item.quantity * 150), 0);
        await cart.save();

        return res.status(200).send({ msg: 'Product added to cart', data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }

}