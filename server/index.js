const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
require("dotenv").config();



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));



const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    res.json({ username, email, password });
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})  