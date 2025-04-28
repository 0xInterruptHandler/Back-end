const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

class AuthService {
  // Función para registrar un nuevo usuario
  static async register(email, password) {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });

      // Genera el token JWT
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Función para iniciar sesión
  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      // Compara la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Genera el token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AuthService;
