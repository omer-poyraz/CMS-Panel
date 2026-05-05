import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LanguageUpdateService } from '../../service';

export const fetchLanguageUpdate = createAsyncThunk(
    'languageUpdate/fetchLanguageUpdate',
    async ({ data }) => {
        const response = await LanguageUpdateService(data)
        return response.result;
    }
);

const languageUpdateSlice = createSlice({
    name: 'languageUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguageUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLanguageUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLanguageUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default languageUpdateSlice.reducer;
