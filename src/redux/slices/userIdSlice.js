import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserGetService } from '../../service';

export const fetchUserId = createAsyncThunk(
    'userId/fetchUserId',
    async ({ id }) => {
        const response = await UserGetService(id)
        return response.result;
    }
);

const userIdSlice = createSlice({
    name: 'userId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {
        clearUserId: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clearUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
