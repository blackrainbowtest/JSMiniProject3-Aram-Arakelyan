import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    errorMessage: "",
    loading: false,
}

export const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload
        },
        setLoad: (state, action) => {
            state.loading = action.payload
        },
        setCallback: (state, action) => {
            state.callback = action.payload;
        },
    }
})

// export slice to app/store
export default mainSlice.reducer

export const { setError, setLoad, setCallback } = mainSlice.actions