const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an instance of the Express Router

const { // Import controller functions
    getCoordinats,
    getImageById,
    postCreateImage
} = require('../controllers/images.controller.js');

// GET Routes 
router.get('/', getCoordinats); // Route to get all images
router.get('/:id', getImageById); // Route to get a specific image by ID

// Post Routes
router.post('/', postCreateImage); // Route to create a new image

module.exports = router; // Export the router for use in other files
