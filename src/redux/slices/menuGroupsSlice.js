import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MenuGroupGetAllService } from '../../service';

export const fetchMenuGroups = createAsyncThunk(
    'menuGroups/fetchMenuGroups',
    async ({ lang }) => {
        const response = await MenuGroupGetAllService(lang)
        return response.result;
    }
);

const menuGroupsSlice = createSlice({
    name: 'menuGroups',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuGroups.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuGroups.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenuGroups.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default menuGroupsSlice.reducer;
