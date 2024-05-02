const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an instance of the Express Router

const { // Import controller functions
    getCoordinats
} = require('../controllers/images.controller.js');

// GET Routes 
router.get('/', getCoordinats); // Route to get all coordinates

module.exports = router; // Export the router for use in other files