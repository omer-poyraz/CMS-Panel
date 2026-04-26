import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserUpdateService } from '../../service';

export const fetchUserEdit = createAsyncThunk(
    'userEdit/fetchUserEdit',
    async ({ data }) => {
        var response = await UserUpdateService(data)
        return response.result;
    }
);

const userEditSlice = createSlice({
    name: 'userEdit',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserEdit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserEdit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Kullanıcı güncelleme başarıyla tamamlandı.")
            })
            .addCase(fetchUserEdit.rejected, (state) => {
                state.status = 'failed';
                toast.error("Kullanıcı güncellenirken bir sorun oluştu!")
            });
    },
});

export default userEditSlice.reducer;
