import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserDeleteService } from '../../service';

export const fetchUserDelete = createAsyncThunk(
    'userDelete/fetchUserDelete',
    async ({ id }) => {
        const response = await UserDeleteService(id)
        return response.result;
    }
);

const userDeleteSlice = createSlice({
    name: 'userDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Kullanıcı başarıyla silindi.")
            })
            .addCase(fetchUserDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Kullanıcı silinirken bir sorun oluştu!")
            });
    },
});

export default userDeleteSlice.reducer;
