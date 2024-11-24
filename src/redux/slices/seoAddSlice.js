import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SeoCreateService } from '../../service';
import { toast } from 'react-toastify';

export const fetchSeoAdd = createAsyncThunk(
    'seoAdd/fetchSeoAdd',
    async ({ data }) => {
        const response = await SeoCreateService(data)
        return response.result;
    }
);

const seoAddSlice = createSlice({
    name: 'seoAdd',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeoAdd.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeoAdd.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("İçerik başarıyla oluşturuldu.")
            })
            .addCase(fetchSeoAdd.rejected, (state) => {
                state.status = 'failed';
                toast.error("İçerik oluşturulurken bir sorun oluştu!")
            });
    },
});

export default seoAddSlice.reducer;
