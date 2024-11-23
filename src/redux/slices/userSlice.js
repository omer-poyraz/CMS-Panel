import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserGetService } from '../../service';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        var userId = JSON.parse(localStorage.getItem("auth")).userId
        const response = await UserGetService(userId)
        return response.result;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userSlice.reducer;
