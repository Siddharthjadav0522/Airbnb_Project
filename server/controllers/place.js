const Place = require('../models/place');
const imageDownloader = require("image-downloader");
const fs = require("fs");

const createPlace = async (req, res) => {
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
        res.status(201).json({ message: 'Place updated successfully', success: true, placeDoc });
    } catch (err) {
        console.error("Error creating place:", err.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const updetePlace = async (req, res) => {
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
        res.status(200).json({ message: 'Place updated successfully',success: true , updatePlace });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' ,success: false });
    }
};

const getPlace = async (req, res) => {
    try {
        allPlace = await Place.find();
        res.json(allPlace);
    } catch (err) {
        console.log(err.message)
    }
};

const getOnePlace = async (req, res) => {
    let id = req.params.id;
    try {
        let place = await Place.findById(id);
        res.json(place);
    } catch (err) {
        console.log(err.message);
    }
};

const userCreatedPlace = async (req, res) => {
    try {
        let id = req.user._id;
        owner = await Place.find({ owner: id });
        res.json(owner);
    } catch (err) {
        console.log(err.message)
    }
};

const uploadLink = async (req, res) => {
    try {
        // console.log(req.body);
        const { link } = req.body;
        // const newName = "Photo" + Date.now() + ".jpg";
        // const filePath = __dirname + "/uploads/" + newName;
        // await imageDownloader.image({ url: link, dest: filePath });
        res.status(200).json({ filename: link });
    } catch (err) {
        console.error("Error downloading image:", err.message);
        res.status(500).json({ message: "Image download failed", success: false });
    }
};

const uploadImage = (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send({ message: "No files uploaded" });
    }
    const fileUrls = files.map(file => file.path);
    res.status(200).json({ message: "Files uploaded successfully", fileUrls });
};

const placeDelete = async (req, res) => {
    try {
        const placeId = req.params.id;
        const deletePlace = await Place.findByIdAndDelete(placeId);
        if (!deletePlace) {
            return res.status(404).json({ message: "Place not found", success: false });
        }
        // console.log(deletePlace);
        res.json({ message: "Place deleting", success: true });
    } catch (error) {
        console.error("Error deleting place:", error.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports = { createPlace, updetePlace, getPlace, getOnePlace, userCreatedPlace, uploadLink, uploadImage ,placeDelete };