import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SeoGetAllService } from '../../service';

export const fetchSeos = createAsyncThunk(
    'seos/fetchSeos',
    async () => {
        const response = await SeoGetAllService()
        return response.result;
    }
);

const seosSlice = createSlice({
    name: 'seos',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSeos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSeos.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default seosSlice.reducer;
