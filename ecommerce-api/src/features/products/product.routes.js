const express = require('express');
const router = express.Router();
const productController = require('./product.controller');

// CRUD routes
router.post('/', productController.createProduct);       // Crear producto
router.get('/', productController.getAllProducts);       // Listar productos
router.get('/:id', productController.getProductById);     // Ver un producto
router.put('/:id', productController.updateProduct);      // Actualizar producto
router.delete('/:id', productController.deleteProduct);   // Eliminar producto

module.exports = router;
