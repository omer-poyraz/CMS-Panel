import { createSlice } from '@reduxjs/toolkit';

const previewSlice = createSlice({
    name: 'preview',
    initialState: {
        isPreview: false,
    },
    reducers: {
        togglePreview: (state) => {
            state.isPreview = !state.isPreview;
        },
        setPreview: (state, action) => {
            state.isPreview = action.payload;
        },
    },
});

export const { togglePreview, setPreview } = previewSlice.actions;
export default previewSlice.reducer;
