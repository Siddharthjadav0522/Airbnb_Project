const express = require('express');
const router = express.Router();
const { createBooking, userBooking ,cancelBooking } = require('../controllers/booking');
const {authenticate} = require('../middlewares/auth');

router.get('/bookings', authenticate, userBooking);
router.post('/bookings', authenticate, createBooking);
router.delete('/bookings/:id', authenticate, cancelBooking);

module.exports = router;