import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: sessionStorage.getItem("theme") !== null
        ? JSON.parse(sessionStorage.getItem("theme"))
        : false
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            sessionStorage.setItem("theme", JSON.stringify(!state.theme));
            state.theme = !state.theme;
        },
    },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
