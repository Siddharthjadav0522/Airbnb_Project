const express = require("express");
const cors = require("cors");
const port = 4000;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const User = require("./models/user");


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());
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
});

app.post("/login", async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const passOK = bcrypt.compareSync(password, user.password);
        if (passOK) {
            jwt.sign({
                email: user.email,
                id: user._id,
                name: user.name,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
                console.log(token);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    }
    else {
        res.json('user not found');
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async(err, user) => {
            if (err) throw err;
            // const user = await User.findById(user._id); or
            // const {name,email,_id} = await User.findById(user._id);
            // res.json(name,email,_id); or
            res.json(user);
        })
    } else { 
        res.json(null)
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token",'').json(true);    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})   