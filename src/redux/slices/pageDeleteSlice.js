import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { PageDeleteService } from '../../service';

export const fetchPageDelete = createAsyncThunk(
    'seoId/fetchPageDelete',
    async ({ id }) => {
        const response = await PageDeleteService(id)
        return response.result;
    }
);

const pageDeleteSlice = createSlice({
    name: 'pageDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPageDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Sayfa içeriği başarıyla silindi.")
            })
            .addCase(fetchPageDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Sayfa içeriği silinirken bir sorun oluştu!")
            });
    },
});

export default pageDeleteSlice.reducer;
