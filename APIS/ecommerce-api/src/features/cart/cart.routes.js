const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

// CRUD routes
router.post('/', authMiddleware, cartController.addToCart);       // Agregar producto al carrito
router.get('/', authMiddleware, cartController.getCart);         // Obtener carrito
router.delete('/:productId', authMiddleware, cartController.removeFromCart); // Eliminar producto del carrito

module.exports = router;
