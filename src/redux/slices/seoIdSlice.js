import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SeoGetService } from '../../service';

export const fetchSeoId = createAsyncThunk(
    'seoId/fetchSeoId',
    async ({ id }) => {
        const response = await SeoGetService(id)
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
            .addCase(fetchSeoId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeoId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSeoId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default seoIdSlice.reducer;
