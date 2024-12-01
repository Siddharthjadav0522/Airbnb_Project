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
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.use(cookieParser());


// const bcryptSalt = bcrypt.genSaltSync(12);
// const jwtSecret = 'mysecretkey';

app.post("/register", async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: "You already have an account, please login.", success: false })
        }

        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.json(err.message);
                } else {
                    let user = await User.create({
                        name,
                        email,
                        password: hash,
                    })

                    res.status(201).json({
                        massage: "user created successfully",
                        success: true
                    })
                }
            })
        })

    } catch (err) {
        console.error(err);
        res.status(422).json({
            message: "Internal sarver error",
            success: false,
        })
    }
});

app.post("/login", async (req, res) => {

    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "Email or Password incorrect" })
        }
        const passOK = await bcrypt.compare(password, user.password);
        if (!passOK) {
            return res.status(422).json({ message: "Email or Password incorrect", success: false });
        }
        let token = jwt.sign(
            { email: user.email, name: user.name, id: user._id },
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
            message: "Login Successful",
            success: true,
            token,
            email,
            name: user.name,
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

});

app.get("/profile", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        let { name, email, _id } = user;
        res.json({ name, email, _id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", '').json(true);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})   