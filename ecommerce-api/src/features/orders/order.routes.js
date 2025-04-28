// src/features/orders/order.routes.js
const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

// Rutas para las órdenes
router.post('/', authMiddleware, orderController.createOrder);  // Crear orden
router.get('/', authMiddleware, orderController.getOrdersByUser);  // Ver todas las órdenes de un usuario
router.get('/:id', authMiddleware, orderController.getOrderById);  // Ver una orden específica

module.exports = router;
