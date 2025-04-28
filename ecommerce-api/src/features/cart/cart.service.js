const { Cart, CartItem } = require('./cart.model');
const Product = require('../products/product.model');

const addToCart = async (userId, productId, quantity) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      const newCart = await Cart.create({ userId });
      await newCart.createCartItem({ productId, quantity });
      return newCart;
    }

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return cart;
    }

    await cart.createCartItem({ productId, quantity });
    return cart;
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: Product,
      },
    });
    if (!cart) throw new Error('Cart not found');
    return cart;
  } catch (error) {
    throw new Error('Error fetching cart: ' + error.message);
  }
};

const removeFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Cart not found');

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!cartItem) throw new Error('Product not in cart');

    await cartItem.destroy();
    return cart;
  } catch (error) {
    throw new Error('Error removing from cart: ' + error.message);
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
  removeFromCart,
};
