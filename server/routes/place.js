const express = require('express');
const router = express.Router();
const { createPlace, updetePlace, getPlace, getOnePlace, userCreatedPlace, uploadLink, uploadImage } = require('../controllers/place');
const authenticate = require('../middlewares/auth');
const multer = require('multer')
const { storage } = require("../config/cloudConfig");
const upload = multer({ storage });
// const photoMiddleware = multer({ dest: "uploads/" });

router.get('/places', getPlace);
router.get('/places/:id', authenticate, getOnePlace); 
router.get('/user-places', authenticate, userCreatedPlace);
router.post('/upload-by-link', uploadLink);
router.post('/upload', upload.array("photos",100), uploadImage); 
// router.post('/upload', photoMiddleware.array("photos", 100), uploadImage);
router.post('/places', authenticate, createPlace);
router.put('/places', authenticate, updetePlace);

module.exports = router;