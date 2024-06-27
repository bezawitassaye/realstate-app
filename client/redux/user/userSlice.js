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
        updateUserStart:(state)=>{
            state.loading = true
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false
        },
        deleeteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false
        },
        deleteUserStart:(state)=>{
            state.loading=true
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null
        }
    },
});

export const { signInStart, 
    signInSuccess, 
    signInFailure,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    deleeteUserFailure,
    deleteUserStart,
    deleteUserSuccess
 } = userSlice.actions;

export default userSlice.reducer;
