const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const {createReview, getReviews} = require('../controllers/review')

router.get('/:id/reviews', authenticate, getReviews);
router.post('/:id/reviews', authenticate, createReview);

module.exports = router;