const Booking = require('../models/booking');

const createBooking = async (req, res) => {
    try {
        const { checkIn, checkOut, numberOfGuests, name, phone, price, place } = req.body;

        if (!checkIn || !checkOut || !numberOfGuests || !name || !phone || !price || !place) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format", success: false });
        }

        if (checkInDate >= checkOutDate) {
            return res.status(400).json({ message: "Check-out date must be later than check-in date", success: false });
        }

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

        res.status(201).json({ message: "Booking created successfully", success: true, bookingDoc });
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

const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const cencelBooking = await Booking.findByIdAndDelete(bookingId);
        if (!cencelBooking) {
            return res.status(404).json({ message: "Booking not found", success: false });
        }
        res.json({ message: "Booking cancelled", success: true });
    } catch (error) {
        console.error("Error cancelling booking:", error.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports = { createBooking, userBooking, cancelBooking };