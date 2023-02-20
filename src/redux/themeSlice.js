import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
};
const themeSlice = createSlice({
    name: "themeSlice",
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
