const mongoose = require('mongoose'); // Import mongoose library

// Define the schema for the Images collection
const ImagesSchema = mongoose.Schema(
    {
        images: [{ type: String, required: true }], // Array of image paths
        lat: { type: Number, required: true }, // Latitude
        lng: { type: Number, required: true }, // Longitude
        text: { type: String, required: true } // Description
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Create a model based on the schema
const Images = mongoose.model('Images', ImagesSchema);

// Export the schema model
module.exports = Images;
