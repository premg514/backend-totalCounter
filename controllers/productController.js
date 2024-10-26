// controllers/productController.js

exports.calculateTotalValue = (req, res) => {
    const products = req.body.products; // Expecting a list of products in the request body

    // Validate input
    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid input: Products should be an array.' });
    }

    // Calculate the total value
    const totalValue = products.reduce((total, product) => {
        // Validate product properties
        const { name, price, quantity } = product;
        if (typeof name !== 'string' || typeof price !== 'number' || typeof quantity !== 'number') {
            return total; // Skip invalid products
        }
        const productValue = price * quantity;
        return total + productValue;
    }, 0);

    // Send back the total value
    res.json({ totalValue });
};
