import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { MenuGroupDeleteService } from '../../service';

export const fetchMenuGroupDelete = createAsyncThunk(
    'menuGroupDelete/fetchMenuGroupDelete',
    async ({ id }) => {
        const response = await MenuGroupDeleteService(id)
        return response.result;
    }
);

const menuGroupDeleteSlice = createSlice({
    name: 'menuGroupDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuGroupDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuGroupDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Başlık başarıyla silindi.")
            })
            .addCase(fetchMenuGroupDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Başlık silme işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default menuGroupDeleteSlice.reducer;
