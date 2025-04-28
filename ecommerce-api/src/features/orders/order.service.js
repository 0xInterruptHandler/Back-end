// src/features/orders/order.service.js
const Order = require('./order.model');
const Product = require('../products/product.model'); // Para verificar el stock de productos
const { Cart, CartItem } = require('../cart/cart.model'); // Para obtener los productos en el carrito

// Crear una nueva orden
const createOrder = async (userId) => {
  // Verificamos si el usuario tiene productos en su carrito
  const cart = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        include: [Product] // Incluir productos en los items del carrito
      }
    ]
  });

  if (!cart || cart.CartItems.length === 0) {
    throw new Error('Cart is empty');
  }

  // Calcular el total de la orden y verificar el stock de los productos
  let totalAmount = 0;
  for (const item of cart.CartItems) {
    const product = item.Product;  // Acceder al producto asociado
    if (!product || product.stock < item.quantity) {
      throw new Error(`Not enough stock for product: ${product.name}`);
    }
    totalAmount += product.price * item.quantity;
  }

  // Crear la orden
  const order = await Order.create({
    userId,
    totalAmount,
    status: 'pending'
  });

  // Reducir el stock de los productos y vaciar el carrito
  for (const item of cart.CartItems) {
    const product = item.Product;  // Acceder al producto asociado
    product.stock -= item.quantity;
    await product.save();
  }
  
  // Vaciar el carrito después de crear la orden
  await Cart.destroy({ where: { userId } });

  return order;
};

// Obtener todas las órdenes de un usuario
const getOrdersByUser = async (userId) => {
  return await Order.findAll({ where: { userId } });
};

// Obtener una orden por ID
const getOrderById = async (orderId) => {
  return await Order.findByPk(orderId);
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById
};
