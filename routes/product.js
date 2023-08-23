'use strict'
const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();

router.get('/product', productController.getProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;