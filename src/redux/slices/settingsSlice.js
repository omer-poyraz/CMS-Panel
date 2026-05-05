import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SettingsGetService } from '../../service';

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async ({ lang }) => {
        const response = await SettingsGetService(lang)
        return response.result;
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSettings.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default settingsSlice.reducer;
