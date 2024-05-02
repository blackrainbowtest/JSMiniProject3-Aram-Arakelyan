const fs = require('fs');
const { google } = require('googleapis');
const { PassThrough } = require('stream');
require('dotenv').config();

const GOOGLE_API_FOLDER_ID = process.env.NODE_JS_GOOGLE_API_FOLDER_ID;

async function uploadToGoogleDrive(imageBuffer, fileName) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const driveService = google.drive({
            version: 'v3',
            auth
        });

        const fileMetaData = {
            'name': fileName,
            'parents': [GOOGLE_API_FOLDER_ID]
        };

        const bufferStream = new PassThrough();
        bufferStream.end(imageBuffer);

        const media = {
            mimeType: 'image/*',
            body: bufferStream
        };

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        return response.data.id;

    } catch (err) {
        console.log('Upload file error', err);
        throw err; // Propagate the error to handle it outside this function if needed
    }
}

module.exports = uploadToGoogleDrive;
