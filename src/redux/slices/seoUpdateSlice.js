import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SeoUpdateService } from '../../service';
import { toast } from 'react-toastify';

export const fetchSeoUpdate = createAsyncThunk(
    'seoUpdate/fetchSeoUpdate',
    async ({ data }) => {
        const response = await SeoUpdateService(data)
        return response.result;
    }
);

const seoUpdateSlice = createSlice({
    name: 'seoUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeoUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeoUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("İçerik başarıyla güncellendi.")
            })
            .addCase(fetchSeoUpdate.rejected, (state) => {
                state.status = 'failed';
                toast.error("İçerik güncellenirken bir sorun oluştu!")
            });
    },
});

export default seoUpdateSlice.reducer;
