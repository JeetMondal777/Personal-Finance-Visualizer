const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
//const fileUpload = require("express-fileupload");
const connectDB = require("./db/db");

// Routes
const TransactionRoutes = require("./Routes/Transaction.routes");

// Database Connection
connectDB();

// Middleware Configuration
app.disable("x-powered-by");
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    //methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(fileUpload({ useTempFiles: true }));

// API Routes
app.use("/transaction", TransactionRoutes);

// Basic Route
app.get("/", (req, res) => {
    res.send("Finance Management API");
});

module.exports = app;