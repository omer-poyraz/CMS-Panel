import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserGetAllService } from '../../service';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await UserGetAllService(1, 50)
        return response.result;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default usersSlice.reducer;
