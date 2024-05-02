import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_BASE_URL}/images/`;

export const getImages = createAsyncThunk(
    'image/getImages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url); // Send a request to the Node.js server
            return response.data; // Return data from the response
        } catch (err) {
            return rejectWithValue(err.message); // Return an error message if something went wrong
        }
    }
);

export const getImageByID = createAsyncThunk(
    'image/getImageByID',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}${id}`); // Send a request to the Node.js server
            return response.data; // Return data from the response
        } catch (err) {
            return rejectWithValue(err.message); // Return an error message if something went wrong
        }
    }
);

export const postImages = createAsyncThunk(
    'post/addImages',
    async (requestData, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            requestData.images.forEach(file => {
                formData.append('images', file);
            });

            // Add the rest of the data to the FormData object
            formData.append('lng', requestData.lng);
            formData.append('lat', requestData.lat);
            formData.append('text', requestData.text);

            const response = await axios.post(url, formData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)