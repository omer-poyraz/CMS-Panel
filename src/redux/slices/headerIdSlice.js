import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HeaderGetService } from '../../service';

export const fetchHeaderId = createAsyncThunk(
    'headerId/fetchHeaderId',
    async ({ id }) => {
        const response = await HeaderGetService(id)
        return response.result;
    }
);

const headerIdSlice = createSlice({
    name: 'headerId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaderId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHeaderId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchHeaderId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default headerIdSlice.reducer;
