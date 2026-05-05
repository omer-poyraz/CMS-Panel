import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { SettingsUpdateService } from '../../service';

export const fetchSettingsUpdate = createAsyncThunk(
    'settingsUpdate/fetchSettingsUpdate',
    async ({ data }) => {
        const response = await SettingsUpdateService(data)
        return response.result;
    }
);

const settingsUpdateSlice = createSlice({
    name: 'settingsUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettingsUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSettingsUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("İçerik başarıyla güncellendi.")
            })
            .addCase(fetchSettingsUpdate.rejected, (state) => {
                state.status = 'failed';
                toast.error("İçerik güncellenirken bir sorun oluştu!")
            });
    },
});

export default settingsUpdateSlice.reducer;
