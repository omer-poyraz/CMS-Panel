import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginService } from '../../service';

export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async ({ username, password }) => {
        const response = await LoginService(username, password)
        return response;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default loginSlice.reducer;
