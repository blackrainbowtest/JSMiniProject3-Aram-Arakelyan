const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const imageRoute = require("./routes/images.route.js");
const coordinateRoute = require("./routes/coordinate.route.js");
const cors = require('cors');
const multer = require('multer');

require('dotenv').config();
const port = process.env.NODE_JS_PORT || 3000;

const errorMSG = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express(); // Create an instance of the Express application

// Middleware configuration
app.use(cors());
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse incoming requests with URL-encoded payloads

// Configure multer for handling multipart/form-data
const storage = multer.memoryStorage(); // Use memory storage to handle file uploads
const upload = multer({ storage: storage });

// Routes
app.use("/images/", upload.array('images'), imageRoute); // Mount the image route handler at the /images path
app.use("/coordinates/", upload.array('images'), coordinateRoute); // Mount the image route handler at the /images path

mongoose.connect(process.env.NODE_JS_DB_CONNECTION)
    .then(() => {
        console.log(successMsg('Connected to MongoDB!'));
        app.listen(port, () => {
            console.log(successMsg(`Server is running on port ${port}`));
        });
    })
    .catch((err) => {
        console.log(errorMSG("Connection to MongoDB failed:", err));
    });