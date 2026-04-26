import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { MenuDeleteService } from '../../service';

export const fetchMenuDelete = createAsyncThunk(
    'menuDelete/fetchMenuDelete',
    async ({ id }) => {
        const response = await MenuDeleteService(id)
        return response.result;
    }
);

const menuDeleteSlice = createSlice({
    name: 'menuDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Başlık başarıyla silindi.")
            })
            .addCase(fetchMenuDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Başlık silme işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default menuDeleteSlice.reducer;
