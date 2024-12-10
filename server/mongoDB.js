const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));

module.exports = mongoose.connections;