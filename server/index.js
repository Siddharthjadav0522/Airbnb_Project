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
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

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

    // const { email, password } = req.body;
    // const user = await User.findOne({ email });
    // if (user) {
    //     const passOK = bcrypt.compareSync(password, user.password);
    //     if (passOK) {
    //         jwt.sign({
    //             email: user.email,
    //             id: user._id,
    //             name: user.name,
    //         }, jwtSecret, {}, (err, token) => {
    //             if (err) throw err;
    //             res.cookie('token', token).json(user);
    //             console.log(token);
    //         });
    //     } else {
    //         res.status(422).json('pass not ok');
    //     }
    // }
    // else {
    //     res.json('user not found');
    // }

    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.send("Email or Password incorrect")
        }
        const passOK = await bcrypt.compare(password, user.password);
        if (!passOK) {
            return res.status(422).json({ message: "Email or Password incorrect", success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, name: user.name, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        console.log(jwtToken)
        res.status(200).cookie("token", jwtToken).json({
            message: "Login Successfull",
            success: true,
            jwtToken,
            email,
            name: user.name,
        })

    } catch (error) {
        console.error(err.massage);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

});

app.get("/profile", (req, res) => {
    const token = req.headers.cookie;
    // console.log(token);
    
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
            // if (err) throw err;
            console.log(user);
            
            // const user = await User.findById(user._id); 
            // const {name,email,_id} = await User.findById(user._id);
            // res.json(name,email,_id); 
            // res.json(user);
            res.json("user");
        })
    } else {
        res.json(null)
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", '').json(true);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})   