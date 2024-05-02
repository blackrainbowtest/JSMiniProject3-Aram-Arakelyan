import { createSlice } from "@reduxjs/toolkit"

// importing action functions from API
import { getCoordinates } from "./CoordinatesAPI"

const initialState = {
    data: [],
    loading: false,
    errorMessage: []
}

export const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState: initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = [...state.errorMessage, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoordinates.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCoordinates.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCoordinates.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = [...state.errorMessage, action.payload];
            })
    }
})

// export slice to app/store
export default coordinatesSlice.reducer

export const { setError } = coordinatesSlice.actions