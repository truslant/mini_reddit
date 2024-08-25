import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recordsApi } from "./apis/recordsApi";

import { chanelReducer } from "./slices/chanelSlice";
import { searchQuoteReducer } from "./slices/filterSlice";
import { drawerReducer, drawerToggle } from "./slices/drawerSlice";


export const store = configureStore({

    reducer: {
        //in this section the connection between the RTK createApi generated queries and the Redux store is happening via allocating reducer path
        // recordsApi has a key called reducerPath which is basically a reference to the slice of state, so instead of putting in actual name of the slice, reference to it is encoded instead preventint typos
        [recordsApi.reducerPath]: recordsApi.reducer,
        channel: chanelReducer,
        searchQuote: searchQuoteReducer,
        drawer: drawerReducer
    },

    // 
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(recordsApi.middleware);
    }
});

setupListeners(store.dispatch);


export { useFetchChannelsQuery, useFetchFoundRecordsQuery, useFetchPostCommentsQuery } from './apis/recordsApi';
export { changeChannel } from "./slices/chanelSlice";
export { changeSearchQuote } from "./slices/filterSlice";
export { drawerToggle } from './slices/drawerSlice';
