// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST endpoint to calculate total value from a list of products
router.post('/calculate-total', productController.calculateTotalValue);

module.exports = router;
