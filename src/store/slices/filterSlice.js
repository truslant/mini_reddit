import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'searchQuote',
    initialState: '',
    reducers: {
        changeSearchQuote: (state, action) => {
            return action.payload
        }
    }
}

const searchQuoteSlice = createSlice(options);

export const searchQuoteReducer = searchQuoteSlice.reducer;
export const { changeSearchQuote } = searchQuoteSlice.actions;