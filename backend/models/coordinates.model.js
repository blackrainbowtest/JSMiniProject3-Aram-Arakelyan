const mongoose = require('mongoose'); // Import mongoose library

// Define the schema for the Coordinates collection
const CoordinatesSchema = mongoose.Schema(
    {
        lat: { type: Number, required: true }, // Latitude
        lng: { type: Number, required: true }, // Longitude
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Create a model based on the schema
const Coordinates = mongoose.model('Coordinates', CoordinatesSchema);

// Export the schema model
module.exports = Coordinates;
