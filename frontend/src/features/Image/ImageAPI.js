import { createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"

const url = "http://localhost:4000/image"

export const getImages = createAsyncThunk(
    'image/getCategorys',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);