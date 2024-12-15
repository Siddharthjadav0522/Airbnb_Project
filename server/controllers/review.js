const Review = require('../models/review');
const Place = require('../models/place');


const createReview = async (req, res) => {
    try {
        const id = req.params.id;
        let { rating, comment } = req.body;
        rating = Number(rating);

        const place = await Place.findById(id);
        const review = await Review.create({ rating, comment, author: req.user._id });
        place.reviews.push(review._id);
        await place.save();
        // console.log(review);
        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            review
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the review',
        });
    }
}

const getReviews = async (req, res) => {
    try {
        const id = req.params.id;
        const place = await Place.findById(id).populate({
            path: 'reviews',
            populate: {
                path: 'author', 
                select: 'name email', 
            },
        });
        res.status(200).json({ reviews: place.reviews });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { createReview, getReviews }