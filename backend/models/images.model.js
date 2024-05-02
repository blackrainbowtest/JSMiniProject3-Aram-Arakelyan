const mongoose = require('mongoose'); // Import mongoose library

// Define the schema for the Images collection
const ImagesSchema = mongoose.Schema(
    {
        images: [{ type: String, required: true }], // Array of image paths
        text: { type: String, required: true }, // Description
        cor_id: { type: String, required: true }
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Create a model based on the schema
const Images = mongoose.model('Images', ImagesSchema);

// Export the schema model
module.exports = Images;
