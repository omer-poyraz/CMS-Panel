import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuGroupGetService } from '../../service';

export const fetchMenuGroupId = createAsyncThunk(
    'menuGroupId/fetchMenuGroupId',
    async ({ id, lang }) => {
        const response = await MenuGroupGetService(id, lang)
        return response.result;
    }
);

const menuGroupIdSlice = createSlice({
    name: 'menuGroupId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuGroupId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuGroupId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenuGroupId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default menuGroupIdSlice.reducer;
