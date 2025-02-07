const priceService = require("../services/priceService");

let cart = {}; 

// Add to cart 
exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        if (!product || !quantity || quantity <= 0) {
            return res.status(400).json({ error: "Valid product name and quantity are required" });
        }

        const price = await priceService.getProductPrice(product);

        if (!price) {
            return res.status(404).json({ error: `Price not found for product: ${product}` });
        }

        if (cart[product]) {
            cart[product].quantity += quantity;
        } else {
            cart[product] = { quantity, price };
        }

        return res.status(200).json({
            message: `Added ${quantity} x ${product} to cart`,
            cart
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// get cart summary
exports.getCart = (req, res) => {
    try {
        let subtotal = 0;

        Object.entries(cart).forEach(([product, item]) => {
            subtotal += item.quantity * item.price;
        });

        const tax = +(subtotal * 0.125).toFixed(2); 
        const total = +(subtotal + tax).toFixed(2);

        return res.status(200).json({
            items: cart,
            subtotal,
            tax,
            total
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }np
};

// Clear cart
exports.clearCart = (req, res) => {
    cart = {}; // Reset cart
    return res.status(200).json({ message: "Cart has been cleared" });
};
