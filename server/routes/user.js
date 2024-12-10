const express = require('express');
const router = express.Router();
const { register, login, logout, profile } = require('../controllers/user');
const authenticate = require('../middlewares/auth');


router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout);
router.get('/profile', authenticate, profile);

module.exports = router;