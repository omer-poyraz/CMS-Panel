import { createSlice } from '@reduxjs/toolkit';

const fullscreenSlice = createSlice({
    name: 'fullscreen',
    initialState: {
        isFullscreen: false,
    },
    reducers: {
        toggleFullscreen: (state) => {
            state.isFullscreen = !state.isFullscreen;
        },
        setFullscreen: (state, action) => {
            state.isFullscreen = action.payload;
        },
    },
});

export const { toggleFullscreen, setFullscreen } = fullscreenSlice.actions;
export default fullscreenSlice.reducer;
