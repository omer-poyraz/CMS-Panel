import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { LanguageDeleteService } from '../../service';

export const fetchLanguageDelete = createAsyncThunk(
    'languageDelete/fetchLanguageDelete',
    async ({ id }) => {
        const response = await LanguageDeleteService(id)
        return response.result;
    }
);

const languageDeleteSlice = createSlice({
    name: 'languageDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguageDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLanguageDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLanguageDelete.rejected, (state) => {
                state.status = 'failed';
                toast.error("Dil silme işlemi sırasında bir sorun oluştu!")
            });
    },
});

export default languageDeleteSlice.reducer;
