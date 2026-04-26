import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { PageUpdateService } from '../../service';

export const fetchPageUpdate = createAsyncThunk(
    'pageUpdate/fetchPageUpdate',
    async ({ data }) => {
        const response = await PageUpdateService(data)
        return response.result;
    }
);

const pageUpdateSlice = createSlice({
    name: 'pageUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPageUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("İçerik başarıyla güncellendi.")
            })
            .addCase(fetchPageUpdate.rejected, (state) => {
                state.status = 'failed';
                toast.error("İçerik güncellenirken bir sorun oluştu!")
            });
    },
});

export default pageUpdateSlice.reducer;
