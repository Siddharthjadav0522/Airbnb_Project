const express = require('express');
const router = express.Router();
const { authenticate, isReviewAuthor } = require('../middlewares/auth');
const { createReview, getReviews, deleteReview } = require('../controllers/review')

router.get('/:id/reviews', authenticate, getReviews);
router.post('/:id/reviews', authenticate, createReview);
router.delete('/:id/reviews/:reviewId', authenticate, isReviewAuthor, deleteReview);

module.exports = router; 