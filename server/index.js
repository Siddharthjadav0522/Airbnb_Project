const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const User = require("./models/user");
const Place = require("./models/place");
const Booking = require("./models/booking");

const app = express();
const port = 4000;


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use(cookieParser());

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


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ message: "You already have an account. Please login.", success: false });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", success: true });
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email: user.email,
            name: user.name,
        });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});


app.get("/profile", authenticate, (req, res) => {
    const { name, email, _id } = req.user;
    res.json({ name, email, _id });
});


app.post("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, secure: false, sameSite: "strict" });
    res.status(200).json({ message: "Logged out successfully", success: true });
});


app.post("/upload-by-link", async (req, res) => {
    try {
        const { link } = req.body;
        const newName = "Photo" + Date.now() + ".jpg";
        const filePath = __dirname + "/uploads/" + newName;

        await imageDownloader.image({ url: link, dest: filePath });
        res.status(200).json({ filename: newName });
    } catch (err) {
        console.error("Error downloading image:", err.message);
        res.status(500).json({ message: "Image download failed", success: false });
    }
});

const photoMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
    const uploadedFiles = req.files.map((file) => {
        const ext = file.originalname.split(".").pop();
        const newPath = file.path + "." + ext;
        fs.renameSync(file.path, newPath);
        return newPath.replace("uploads\\", "").replace("uploads/", "");
    });
    res.status(200).json(uploadedFiles);
});

app.post("/places", authenticate, async (req, res) => {
    try {
        const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

        const placeDoc = await Place.create({
            owner: req.user._id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });
        // console.log(placeDoc);
        res.status(201).json(placeDoc);
    } catch (err) {
        console.error("Error creating place:", err.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});

app.get('/user-places', authenticate, async (req, res) => {
    try {
        let id = req.user._id;
        owner = await Place.find({ owner: id });
        res.json(owner);
    } catch (err) {
        console.log(err.message)
    }
});

app.get('/places/:id', authenticate, async (req, res) => {
    let id = req.params.id;
    try {
        let place = await Place.findById(id);
        res.json(place);
    } catch (err) {
        console.log(err.message);
    }
});

app.put('/places', authenticate, async (req, res) => {
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    try {
        let place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        const updatePlace = await Place.findByIdAndUpdate(id, {
            title, address, price,
            photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        }, { new: true });
        res.status(200).json({ message: 'Place updated successfully', updatePlace });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/places', async (req, res) => {
    try {
        allPlace = await Place.find();
        res.json(allPlace);
    } catch (err) {
        console.log(err.message)
    }
});

app.post("/bookings", authenticate, async (req, res) => {
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
});

app.get('/bookings', authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        allData = await Booking.find({ user: userId }).populate('place');
        res.json(allData);
    } catch (err) {
        console.log(err.message)
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
