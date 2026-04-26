import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuUpdateService } from '../../service';

export const fetchMenuUpdate = createAsyncThunk(
    'menuUpdate/fetchMenuUpdate',
    async ({ data }) => {
        const response = await MenuUpdateService(data)
        return response.result;
    }
);

const menuUpdateSlice = createSlice({
    name: 'menuUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenuUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default menuUpdateSlice.reducer;
