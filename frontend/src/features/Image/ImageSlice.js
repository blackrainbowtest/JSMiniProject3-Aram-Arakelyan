import { createSlice } from "@reduxjs/toolkit"

// importing action functions from API
import { getImages, postImages } from "./ImageAPI"

const initialState = {
    data: [],
    loading: true,
    errorMessage: []
}

export const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.loading = false;
                state.errorMessage.push(action.payload);
            })
            .addCase(getImages.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage.push(action.payload);
            })
            .addCase(postImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(postImages.fulfilled, (state, action) => {
                state.loading = false;
                state.errorMessage.push(action.payload);
            })
            .addCase(postImages.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage.push(action.payload);
            })
    }
})

// export slice to app/store
export default imageSlice.reducer

export const { setError } = imageSlice.actions