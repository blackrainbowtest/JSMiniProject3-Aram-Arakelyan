import { createSlice } from "@reduxjs/toolkit";
import { getImageByID, getImages, postImages } from "./ImageAPI";

const initialState = {
    data: [],
    loading: false,
    errorMessage: [],
}

export const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getImages.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload];
            })
            .addCase(postImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(postImages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload];
            })
            .addCase(postImages.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload];
            })
            .addCase(getImageByID.pending, (state) => {
                state.loading = true;
            })
            .addCase(getImageByID.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getImageByID.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload];
            });
    }
});

export default imageSlice.reducer;
export const { setError } = imageSlice.actions;
