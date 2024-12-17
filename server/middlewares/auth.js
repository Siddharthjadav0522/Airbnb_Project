const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Review = require('../models/review')

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        next();
    } catch (err) {
        console.error("Authentication Error:", err.message);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

const isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(req.user._id)) {
        return res.json({message:'You are not the author of this review'})
    }
    next();
}

module.exports = {authenticate , isReviewAuthor};