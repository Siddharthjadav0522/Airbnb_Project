const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const otpStore = {};

const otpVerifyEmail = async (req, res) => {
    let { email } = req.body;
    let subject = "OTP from siddharth jadav";
    let otp = Math.floor(1000 + Math.random() * 9000);

    otpStore.email = {
        otp: otp,
        time: Date.now()
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "f477siddharth@gmail.com",
            pass: "woxp yhla mtks hljp",
        },
        secure: true,
    });

    let html = `<p>This is your otp , it will expire in 2 minites</P>
    <h1>OTP : ${otp}</h1>
    <p>Thank you and best regards</p>
    `

    const mailData = {
        from: "f477siddharth@gmail.com",
        to: email,
        subject: subject,
        html: html,
    }
    transporter.sendMail(mailData);

    // console.log(otpStore);
    return res.status(200).json({ message: "OTP sent successfully!", success: true });
};

const register = async (req, res) => {
    try {
        let { name, email, password, otp } = req.body;
        console.log(req.body);
        otp = Number(otp)

        if (!otpStore.email) {
            return res.status(400).json({ message: "OTP not sent or expired" });
        }

        if (otpStore.email.otp !== otp || (Date.now() - otpStore.email.time >= 60000)) {
            return res.json({ message: "email verification fail" });
        };

        delete otpStore.email;

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
};

const login = async (req, res) => {
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
};

const logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true, secure: false, sameSite: "strict" });
    res.status(200).json({ message: "Logged out successfully", success: true });
};

const profile = (req, res) => {
    const { name, email, _id } = req.user;
    res.json({ name, email, _id });
};


module.exports = { register, login, logout, profile, otpVerifyEmail };