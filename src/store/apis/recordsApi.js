import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const recordsApi = createApi({

    //reducerPath: defines the slice of the state under which the fetched data is going to be stored
    reducerPath: 'records',

    //fetchBaseQuery: gives pre-configured version of fetch(), the preconfiguration is happening within the function
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.reddit.com/',
    }),

    //endpoints: specifies define/configure how to make data fetch request to server
    endpoints(builder) {
        return {
            //fetchRecords is a voluntary (coder defined) hook name that resutls with generation of a hook: albumsApi.useFetchRecordsQuery()
            fetchChannels: builder.query({
                query: (channel = '/r/popular') => {
                    return {
                        url: `${channel}.json`,
                        method: 'GET',
                    };
                },
            }),
            fetchFoundRecords: builder.query({
                query: (searchChannel) => {
                    return {
                        url: `/${searchChannel}.json`,
                        method: 'GET'
                    }
                }
            }),
            fetchPostComments: builder.query({
                query: (postUrl) => {
                    return {
                        url: `${postUrl}.json`,
                        method: 'GET'
                    }
                }
            })
        }
    }
});

//the hooks created by createApi function are the methods of retreiving the fetched data and should be imported into the components to access the data and its state
export const { useFetchChannelsQuery, useFetchFoundRecordsQuery, useFetchPostCommentsQuery } = recordsApi;
export { recordsApi };