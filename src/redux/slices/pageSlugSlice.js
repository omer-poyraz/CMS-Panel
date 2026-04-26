import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PageGetSlugService } from '../../service';

export const fetchPageSlug = createAsyncThunk(
    'pageSlug/fetchPageSlug',
    async ({ slug }) => {
        const response = await PageGetSlugService(slug)
        return response.result;
    }
);

const pageSlugSlice = createSlice({
    name: 'pageSlug',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageSlug.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPageSlug.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPageSlug.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default pageSlugSlice.reducer;
