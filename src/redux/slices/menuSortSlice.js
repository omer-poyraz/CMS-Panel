import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuSortService } from '../../service';

export const fetchMenuSort = createAsyncThunk(
    'menuSort/fetchMenuSort',
    async ({ id, sort }) => {
        const response = await MenuSortService(id, sort);
        return response.result;
    }
);

const menuSortSlice = createSlice({
    name: 'menuSort',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuSort.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuSort.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenuSort.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clearMenuSort } = menuSortSlice.actions;
export default menuSortSlice.reducer;
