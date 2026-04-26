import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { MenuCreateService } from '../../service';

export const fetchMenuCreate = createAsyncThunk(
    'menuCreate/fetchMenuCreate',
    async ({ data }) => {
        const response = await MenuCreateService(data)
        return response.result;
    }
);

const menuCreateSlice = createSlice({
    name: 'menuCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Başlık başarıyla silindi.")
            })
            .addCase(fetchMenuCreate.rejected, (state) => {
                state.status = 'failed';
                toast.error("Başlık silme işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default menuCreateSlice.reducer;
