import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LanguageGetAllService } from '../../service';

export const fetchLanguages = createAsyncThunk(
    'languages/fetchLanguages',
    async ({ lang }) => {
        const response = await LanguageGetAllService(lang)
        return response.result;
    }
);

const languagesSlice = createSlice({
    name: 'languages',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLanguages.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default languagesSlice.reducer;
