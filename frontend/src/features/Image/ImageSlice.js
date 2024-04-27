import { createSlice } from "@reduxjs/toolkit"

// importing action functions from API
import { getImages } from "./ImageAPI"

const initialState = {
    data: [],
    loading: true,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
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
                state.errorMessage = action.payload
            })
    }
})

// export slice to app/store
export default categorySlice.reducer

export const { setError, changeGender, changeCategory, changeValue } = categorySlice.actions