import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { LanguageCreateService } from '../../service';

export const fetchLanguageCreate = createAsyncThunk(
    'languageCreate/fetchLanguageCreate',
    async ({ data }) => {
        const response = await LanguageCreateService(data)
        return response.result;
    }
);

const languageCreateSlice = createSlice({
    name: 'languageCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguageCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLanguageCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                toast.success("Dil başarıyla eklendi.")
            })
            .addCase(fetchLanguageCreate.rejected, (state) => {
                state.status = 'failed';
                toast.error("Dil ekleme işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default languageCreateSlice.reducer;
