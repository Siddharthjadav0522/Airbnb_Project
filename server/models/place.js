const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.Object, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
});

const placeModel = mongoose.model('place', placeSchema);

module.exports = placeModel;