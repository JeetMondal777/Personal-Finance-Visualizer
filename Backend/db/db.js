const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
    })
    .catch((err) => {
        console.error("Error connecting to DB:", err);
    });
}

module.exports = connectDB