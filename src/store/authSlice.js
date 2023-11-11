import { createSlice, isAction } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        signIn: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        signOut: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {signIn, signOut} =authSlice.actions;

export default authSlice.reducer;