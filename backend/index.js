const express = require('express');
const mongoose = require('mongoose');
const imageRoute = require("./routes/images.route.js");
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express(); // Create an instance of the Express application

// Middleware configuration
app.use(cors());
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse incoming requests with URL-encoded payloads
app.use('/uploads', express.static('uploads'));

// Configure multer for handling multipart/form-data
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        return callback(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage })

// ({ dest: 'uploads/' })

// Routes
app.use("/images/", upload.array('images'), imageRoute); // Mount the image route handler at the /images path

mongoose.connect(process.env.NODE_JS_DB_CONNECTION) // Connect to the MongoDB database using the connection string from the environment variables
    .then(() => {
        console.log('Connected!'); // Log a success message if the connection is successful
        app.listen(process.env.NODE_JS_PORT, () => { // Start the Express server listening on port 3000
            console.log(`Server is running on port ${process.env.NODE_JS_PORT}`);
        });
    })
    .catch(() => console.log("Connection failed")); // Log an error message if the connection fails
