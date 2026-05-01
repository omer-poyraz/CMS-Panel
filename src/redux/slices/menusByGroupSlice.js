import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuGetAllByGroupService } from '../../service';

export const fetchMenusByGroup = createAsyncThunk(
    'menusByGroup/fetchMenusByGroup',
    async ({ id, lang }) => {
        const response = await MenuGetAllByGroupService(id, lang)
        return response.result;
    }
);

const menusByGroupSlice = createSlice({
    name: 'menusByGroup',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenusByGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenusByGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenusByGroup.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default menusByGroupSlice.reducer;
