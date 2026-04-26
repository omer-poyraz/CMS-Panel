import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { MenuGroupCreateService } from '../../service';

export const fetchMenuGroupCreate = createAsyncThunk(
    'menuGroupCreate/fetchMenuGroupCreate',
    async ({ data }) => {
        const response = await MenuGroupCreateService(data)
        return response.result;
    }
);

const menuGroupCreateSlice = createSlice({
    name: 'menuGroupCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuGroupCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuGroupCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Menü grubu başarıyla oluşturuldu.")
            })
            .addCase(fetchMenuGroupCreate.rejected, (state) => {
                state.status = 'failed';
                toast.error("Menü grubu oluşturma işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default menuGroupCreateSlice.reducer;
