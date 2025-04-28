const express = require('express');
const { register, login } = require('./auth.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
