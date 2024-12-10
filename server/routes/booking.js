const express = require('express');
const router = express.Router();
const { createBooking, userBooking } = require('../controllers/booking');
const authenticate = require('../middlewares/auth');

router.get('/bookings', authenticate, userBooking);
router.post('/bookings', authenticate, createBooking);

module.exports = router;