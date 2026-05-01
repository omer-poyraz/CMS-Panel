import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuGetAllService } from '../../service';

export const fetchMenus = createAsyncThunk(
    'menus/fetchMenus',
    async ({ lang }) => {
        const response = await MenuGetAllService(lang)
        return response.result;
    }
);

const menusSlice = createSlice({
    name: 'menus',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenus.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default menusSlice.reducer;
