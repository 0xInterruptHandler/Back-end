// src/features/orders/order.controller.js
const orderService = require('./order.service');

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;  // Obtener el ID del usuario del token JWT
    const order = await orderService.createOrder(userId);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByUser = async (req, res) => {
  const userId = req.user.userId;  // Obtener el ID del usuario desde el token

  try {
    const orders = await orderService.getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await orderService.getOrderById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById
};
