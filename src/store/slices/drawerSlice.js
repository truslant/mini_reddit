import { createSlice } from "@reduxjs/toolkit"

const options = {
    name: 'drawerOpen',
    initialState: true,
    reducers: {
        drawerToggle: (state, action) => {
            return action.payload
        }
    }
}

const drawerSlice = createSlice(options);

export const drawerReducer = drawerSlice.reducer;
export const { drawerToggle } = drawerSlice.actions;

