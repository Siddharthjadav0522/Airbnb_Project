const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = 3000;
require("dotenv").config();
const User = require("./models/user");


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = 'mysecretkey';

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(user);
    } catch (err) {
        res.status(422).json(err);
    }
})
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const passOK = bcrypt.compareSync(password, user.password);
        if (passOK) {
            if (passOK) {
                jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json('pass ok');
                })
            } else {
                res.status(422).json('pass not ok');
            }
        } else {
            res.json('user not found');
        }
    } catch (err) {
        res.status(422).json(err);
    }
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})   