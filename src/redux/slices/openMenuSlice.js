import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

export const openMenuSlice = createSlice({
    name: 'openMenu',
    initialState,
    reducers: {
        changeOpenMenu: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { changeOpenMenu } = openMenuSlice.actions;

export default openMenuSlice.reducer;
