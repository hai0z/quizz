import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: { isLogin: false },
    user: {
        uid: null,
        displayName: null,
        photoURL: null,
        email: null,
        coin: 0,
        role: "USER",
    },
    loading: 0,
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
        setPageLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setAuth, setUser, setPageLoading } = authSlice.actions;
export default authSlice.reducer;
