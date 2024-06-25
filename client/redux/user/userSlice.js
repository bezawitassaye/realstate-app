import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    console: null,  // Consider renaming this as `console` is a reserved word
    loading: false,
    error: null  // Initialize error state
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;  // Clear error on start
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;  // Clear error on success
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Set error message on failure
        },
    },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
