import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SeoDeleteService } from '../../service';
import { toast } from 'react-toastify';

export const fetchSeoDelete = createAsyncThunk(
    'seoId/fetchSeoDelete',
    async ({ id }) => {
        const response = await SeoDeleteService(id)
        return response.result;
    }
);

const seoIdSlice = createSlice({
    name: 'seoId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeoDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeoDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Seo içerik başarıyla silindi.")
            })
            .addCase(fetchSeoDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Seo içerik silinirken bir sorun oluştu!")
            });
    },
});

export default seoIdSlice.reducer;
