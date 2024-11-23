import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: localStorage.getItem("theme") !== null 
        ? JSON.parse(localStorage.getItem("theme")) 
        : false
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            localStorage.setItem("theme", JSON.stringify(!state.theme)); 
            state.theme = !state.theme;
        },
    },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
