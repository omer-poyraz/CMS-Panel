import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreateService, UserUpdateService } from '../../service';
import { toast } from 'react-toastify';

export const fetchUserEdit = createAsyncThunk(
    'userEdit/fetchUserEdit',
    async ({ id, firstName, lastName, userName, email, phoneNumber, password }) => {
        var response;
        const roles = []
        roles.push("Admin")
        if (id) response = await UserUpdateService(id, firstName, lastName, userName, email, phoneNumber)
        else response = await UserCreateService(firstName, lastName, userName, email, phoneNumber, password, roles)
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
                toast.success("İçerik başarıyla oluşturuldu.")
            })
            .addCase(fetchUserEdit.rejected, (state) => {
                state.status = 'failed';
                toast.error("İçerik oluşuturulurken bir sorun oluştu!")
            });
    },
});

export default userEditSlice.reducer;
