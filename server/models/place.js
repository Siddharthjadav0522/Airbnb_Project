const mongoose = require('mongoose');
const Review = require('../models/review');

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        default: []
    },
    description: {
        type: String
    },
    perks: {
        type: [String],
        default: []
    },
    extraInfo: { type: String },
    checkIn: {
        type: Number,
        min: 0,
        max: 24
    },
    checkOut: {
        type: Number,
        min: 0,
        max: 24
    },
    maxGuests: {
        type: Number,
        min: 1
    },
    price: {
        type: Number,
        min: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
});

placeSchema.post("findOneAndDelete", async (place) => {
    if (place) {
        await Review.deleteMany({ _id: { $in: place.reviews } })
    }
})

const placeModel = mongoose.model('Place', placeSchema);

module.exports = placeModel;