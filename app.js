const express = require('express');
const { homepage } = require('./controllers/productControllers');
const productRoutes = require('./routes/productRouter');
const app = express();
app.use(express.json());

app.get('/', homepage);
app.use('/products', productRoutes);

module.exports = app;
