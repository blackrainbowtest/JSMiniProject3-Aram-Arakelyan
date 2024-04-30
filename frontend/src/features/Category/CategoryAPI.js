import { createAsyncThunk } from "@reduxjs/toolkit"

import axios from "axios"

const url = "http://localhost:4000/category"

export const getCategorys = createAsyncThunk(
    'category/getCategorys',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
);