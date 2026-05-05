import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LanguageGetService } from '../../service';

export const fetchLanguageId = createAsyncThunk(
    'languageId/fetchLanguageId',
    async ({ id, lang }) => {
        const response = await LanguageGetService(id, lang)
        return response.result;
    }
);

const languageIdSlice = createSlice({
    name: 'languageId',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {
        clearLanguageId: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguageId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLanguageId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLanguageId.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clearLanguageId } = languageIdSlice.actions;
export default languageIdSlice.reducer;
