const AuthService = require('./auth.service');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.register(email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
