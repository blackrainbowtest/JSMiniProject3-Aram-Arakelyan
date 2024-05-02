import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = `${process.env.REACT_APP_BASE_URL}/coordinates/`;

export const getCoordinates = createAsyncThunk(
    'coordinate/getCoordinates',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url); // Send a request to the Node.js server
            return response.data; // Return data from the response
        } catch (err) {
            return rejectWithValue(err.message); // Return an error message if something went wrong
        }
    }
);