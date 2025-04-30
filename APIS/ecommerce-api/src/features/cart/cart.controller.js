const cartService = require('./cart.service');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await cartService.getCartByUserId(userId);
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    const cart = await cartService.removeFromCart(userId, productId);
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
