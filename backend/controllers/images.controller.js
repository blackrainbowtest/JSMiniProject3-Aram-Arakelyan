const uploadToGoogleDrive = require('../imageUpload.js');
const fs = require('fs');
const axios = require('axios');
const Images = require('../models/images.model.js'); // Import the Images model
const Coordinates = require('../models/coordinates.model.js'); // Import the Images model
require('dotenv').config();

const chalk = require('chalk');

const errorMSG = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const getCoordinats = async (req, res) => {
    // Get all coordinates from the server directory
    try {
        const dbData = await Coordinates.find({});
        res.status(200).json(dbData);
    } catch (error) {
        console.log(errorMSG(error.message));
        res.status(500).json({ message: error.message }); // Return server error if something goes wrong
    }
}

const getImageById = async (req, res) => {
    // Get image by ID from the database
    try {
        const { id } = req.params;
        const imageObj = await Images.findOne({ cor_id: id }); // {text: str, images: array of images links}
        const images = []

        for (const imageUrl of imageObj.images) {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' }); // Устанавливаем responseType на 'arraybuffer'
            const imageBase64 = Buffer.from(response.data, 'binary').toString('base64'); // Преобразуем данные в base64 строку
            images.push(`${imageBase64}`); // Добавляем преобразованное изображение в массив
        }

        res.status(200).json({
            images:images,
            text:imageObj.text,
            cor_id:imageObj.cor_id,
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message }); // Return server error if something goes wrong
    }
}

// POST Controller functions
const postCreateImage = async (req, res) => {
    // Save image data to Google Drive and database
    try {
        // First we create a coordinate record
        const coordinates = await Coordinates.create({
            lat: req.body.lat,          // Get the latitude from the request
            lng: req.body.lng,          // Get longitude from request
        });

        const images = req.files;       // Get the addresses of the loaded images from req.files
        const imageUrls = [];           // Array to store image URLs

        // Upload each image to Google Drive and store the URL
        for (const image of images) {
            const fileId = await uploadToGoogleDrive(image.buffer, `${Date.now()}_${image.originalname}`);
            const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            imageUrls.push(imageUrl);
        }

        // Create a new entry with image addresses
        const image = await Images.create({
            images: imageUrls,          // Save image addresses
            text: req.body.text,        // Get description from request
            cor_id: coordinates.id      // Get coodrinates id
        });

        res.status(200).json(coordinates); // Return the created entry with image addresses
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return an error message
    }
}

module.exports = {
    getCoordinats,
    getImageById,
    postCreateImage
}
