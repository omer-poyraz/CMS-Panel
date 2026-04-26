import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { PageCreateService } from '../../service';

export const fetchPageCreate = createAsyncThunk(
    'pageCreate/fetchPageCreate',
    async ({ data }) => {
        const response = await PageCreateService(data)
        return response.result;
    }
);

const pageCreateSlice = createSlice({
    name: 'pageCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPageCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Sayfa başarıyla oluşturuldu.")
            })
            .addCase(fetchPageCreate.rejected, (state) => {
                state.status = 'failed';
                toast.error("Sayfa oluşturulurken bir sorun oluştu!")
            });
    },
});

export default pageCreateSlice.reducer;
