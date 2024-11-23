import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserUpdateService } from '../../service';

export const fetchUserUpdate = createAsyncThunk(
    'userUpdate/fetchUserUpdate',
    async ({ firstName, lastName, userName, email, phoneNumber }) => {
        var userId = JSON.parse(localStorage.getItem("auth")).userId
        const response = await UserUpdateService(userId, firstName, lastName, userName, email, phoneNumber)
        return response.result;
    }
);

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userUpdateSlice.reducer;
