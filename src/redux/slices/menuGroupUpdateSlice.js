import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuGroupUpdateService } from '../../service';

export const fetchMenuGroupUpdate = createAsyncThunk(
    'menuGroupUpdate/fetchMenuGroupUpdate',
    async ({ data }) => {
        const response = await MenuGroupUpdateService(data)
        return response.result;
    }
);

const menuGroupUpdateSlice = createSlice({
    name: 'menuGroupUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuGroupUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuGroupUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenuGroupUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default menuGroupUpdateSlice.reducer;
