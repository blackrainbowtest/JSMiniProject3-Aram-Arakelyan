const express = require('express'); // Import the Express framework
const Images = require('../models/images.model.js'); // Import the Images model
const router = express.Router(); // Create an instance of the Express Router

const { // Import controller functions
    getImageById,
    getImages,
    postCreateImage
} = require('../controllers/images.controller.js');

// GET Routes 
router.get('/', getImages); // Route to get all images
router.get('/:id', getImageById); // Route to get a specific image by ID

// Post Routes
router.post('/', postCreateImage); // Route to create a new image

module.exports = router; // Export the router for use in other files
