const Images = require('../models/images.model.js'); // Import the Images model

const renderDomain = process.env.NODE_JS_RENDER_DOMAIN || `http://localhost:${process.env.NODE_JS_PORT}`


const getImages = async (req, res) => {
    // Get all images from the server directory
    try {
        const dbData = await Images.find({});

        // Convert each image to a URL
        const imagesWithUrls = dbData.map(item => {
            const imagesUrls = item.images.map(image => {
                const correctedImagePath = image.replace(/\\/g, '/');
                return `${renderDomain}/${correctedImagePath}`;
            });

            return {
                ...item.toJSON(), // Copy all fields from an object from the database
                images: imagesUrls // Replace the image array with an array of URLs
            };
        });

        res.status(200).json(imagesWithUrls);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return server error if something goes wrong
    }
}

const getImageById = async (req, res) => {
    // Get image by ID from the database
    try {
        const { id } = req.params;
        const image = await Images.findById(id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return server error if something goes wrong
    }
}

// POST Controller functions
const postCreateImage = async (req, res) => {
    // Save image data to the database
    try {
        // Get the addresses of the loaded images from req.files
        const imagePaths = req.files.map(file => file.path);

        // Create a new entry with image addresses
        const image = await Images.create({
            images: imagePaths, // Save image addresses
            lat: req.body.lat, // Get the latitude from the request
            lng: req.body.lng, // Get longitude from request
            text: req.body.text // Get description from request
        });

        res.status(200).json(image); // Return the created entry with image addresses
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return an error message
    }
}

module.exports = {
    getImages,
    getImageById,
    postCreateImage
}
