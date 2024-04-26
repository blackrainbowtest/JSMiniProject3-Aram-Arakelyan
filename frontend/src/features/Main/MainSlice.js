import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    errorMessage: "",
    loading: true,
    isUnlock: true,
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
        setUnlock: (state, action) => {
            state.isUnlock = action.payload
        }
    }
})

// export slice to app/store
export default mainSlice.reducer

export const { setError, setLoad, setUnlock } = mainSlice.actions