import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'channel',
    initialState: '',
    reducers: {
        changeChannel: (state, action) => {
            return action.payload
        }
    }
}

const channelSlice = createSlice(options);

export const chanelReducer = channelSlice.reducer;
export const {changeChannel} = channelSlice.actions;