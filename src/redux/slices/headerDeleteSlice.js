import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HeaderGetService } from '../../service';
import { toast } from 'react-toastify';

export const fetchHeaderDelete = createAsyncThunk(
    'headerDelete/fetchHeaderDelete',
    async ({ id }) => {
        const response = await HeaderGetService(id)
        return response.result;
    }
);

const headerDeleteSlice = createSlice({
    name: 'headerDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaderDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHeaderDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Başlık başarıyla silindi.")
            })
            .addCase(fetchHeaderDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Başlık silme işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default headerDeleteSlice.reducer;
