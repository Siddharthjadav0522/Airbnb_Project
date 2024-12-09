const Booking = require('../models/booking');

const createBooking = async (req, res) => {
    try {
        const { checkIn, checkOut, numberOfGuests, name, phone, price, place } = req.body;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const bookingDoc = await Booking.create({
            checkIn: checkInDate,
            checkOut: checkOutDate,
            name,
            phone,
            price,
            place,
            guests: numberOfGuests,
            user: req.user._id
        });
        // console.log(bookingDoc);
        res.status(201).json(bookingDoc);
    } catch (err) {
        console.error("Error creating booking:", err.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const userBooking = async (req, res) => {
    try {
        const userId = req.user._id;
        allData = await Booking.find({ user: userId }).populate('place');
        res.json(allData);
    } catch (err) {
        console.log(err.message)
    }
};

module.exports = { createBooking, userBooking };