import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RegisterService } from '../../service';

export const fetchRegister = createAsyncThunk(
    'register/fetchRegister',
    async ({ data }) => {
        const response = await RegisterService(data)
        return response;
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                if (action.payload && action.payload?.result?.accessToken) {
                    state.status = 'succeeded';
                    state.data = action.payload;
                    sessionStorage.setItem("auth", JSON.stringify(action.payload?.result))
                    toast.success(`Hoşgeldin ${action.payload?.result?.user?.normalizedUserName?.toString().replace("-", " ")}.`)
                }
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default registerSlice.reducer;
