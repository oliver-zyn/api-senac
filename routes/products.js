const express = require('express');
const { getProducts, createProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products')
const authService = require('../services/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/new', authService.isAdmin, createProducts);
router.put('/update/:id', authService.isAdmin, updateProduct);
router.delete('/:id', authService.isAdmin, deleteProduct);

module.exports = router;