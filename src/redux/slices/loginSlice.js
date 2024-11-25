import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginService } from '../../service';
import { toast } from 'react-toastify';

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
                if (action.payload.userId) {
                    state.status = 'succeeded';
                    state.data = action.payload;
                    localStorage.setItem("auth", JSON.stringify(action.payload))
                    toast.success(`Hoşgeldin ${action.payload.name}.`)
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1000);
                }
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default loginSlice.reducer;
