import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lang: localStorage.getItem("lang") !== null && localStorage.getItem("lang") !== undefined
        ? localStorage.getItem("lang")
        : "TR"
};

export const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeLang: (state, action) => {
            localStorage.setItem("lang", action.payload);
            state.lang = action.payload;
        },
    },
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
