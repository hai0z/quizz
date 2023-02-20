import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: { isLogin: false },
    user: {
        uid: null,
        displayName: null,
        photoURL: null,
    },
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        googleLogin: (state, action) => {},
        logOut: (state, action) => {},
    },
});

export const { googleLogin, logOut } = authSlice.actions;
export default authSlice.reducer;
