// app.js or server.js

const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // This line is crucial

// Use the product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
