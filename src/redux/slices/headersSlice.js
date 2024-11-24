import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HeaderGetAllService } from '../../service';

export const fetchHeaders = createAsyncThunk(
    'headers/fetchHeaders',
    async () => {
        const response = await HeaderGetAllService()
        return response.result;
    }
);

const headersSlice = createSlice({
    name: 'headers',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHeaders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchHeaders.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default headersSlice.reducer;
