import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MenuGetService } from '../../service';

export const fetchMenuId = createAsyncThunk(
    'menuId/fetchMenuId',
    async ({ id, lang }) => {
        const response = await MenuGetService(id, lang)
        return response.result;
    }
);

const menuIdSlice = createSlice({
    name: 'menuId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {
        clearMenuId: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMenuId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clearMenuId } = menuIdSlice.actions;
export default menuIdSlice.reducer;
