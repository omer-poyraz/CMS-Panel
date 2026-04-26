import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PageGetAllService } from '../../service';

export const fetchPages = createAsyncThunk(
    'pages/fetchPages',
    async () => {
        const response = await PageGetAllService()
        return response.result;
    }
);

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPages.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default pagesSlice.reducer;
