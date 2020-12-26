const express = require('express');
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getTopSales,
} = require('../controllers/productControllers');

const productRoutes = express.Router();

productRoutes.route('/top-sales').get(getTopSales, getProducts);

productRoutes.route('/').get(getProducts).post(createProduct);

productRoutes
  .route('/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRoutes;
