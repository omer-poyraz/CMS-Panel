import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PageGetService } from '../../service';

export const fetchPageId = createAsyncThunk(
    'pageId/fetchPageId',
    async ({ id }) => {
        const response = await PageGetService(id)
        return response.result;
    }
);

const pageIdSlice = createSlice({
    name: 'pageId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPageId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPageId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default pageIdSlice.reducer;
