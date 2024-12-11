const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
});

const placeModel = mongoose.model('Place', placeSchema);

module.exports = placeModel;