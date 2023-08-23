'use strict'
const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/category', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', categoryController.createCategory);
router.patch('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);
router.get('/category-products/:id', categoryController.getProductsByCategory);

module.exports = router;