import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: { isLogin: false },
    user: {
        uid: null,
        displayName: null,
        photoURL: null,
        email: null,
    },
};
const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
