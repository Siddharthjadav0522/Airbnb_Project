const express = require('express');
const router = express.Router();
const { register, login, logout, profile } = require('../controllers/user');
const {authenticate} = require('../middlewares/auth');
const { registerValidetion, loginValidetion } = require('../middlewares/authvalidetion');

router.post('/register', registerValidetion, register)
router.post('/login', loginValidetion, login)
router.post('/logout', logout);
router.get('/profile', authenticate, profile);

module.exports = router;