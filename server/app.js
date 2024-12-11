const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require('./mongoDB')

const userRouter = require('./routes/user');
const placeRouter = require('./routes/place');
const bookingRouter = require('./routes/booking');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

app.use('/user', userRouter);
app.use('/', placeRouter);
app.use('/place', bookingRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
