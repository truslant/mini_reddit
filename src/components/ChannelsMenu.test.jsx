import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { store } from "../store";
import ChannelsMenu from "./ChannelsMenu";
import * as apiHooks from "../store/apis/recordsApi";  // Import everything from recordsApi

const mockChanelMenuItem = vi.fn();

vi.mock('./ChannelMenuItem', () => {
    return {
        default: (props) => {
            mockChanelMenuItem(props);
            return <div>{props.channel}</div>;
        }
    };
});

describe('ChannelsMenu', () => {


    it('renders the component', () => {
        // Spy on the useFetchChannelsQuery hook
        const spy = vi.spyOn(apiHooks, 'useFetchChannelsQuery')
            .mockReturnValue({
                error: null,
                isLoading: false,
                data: {
                    data: {
                        children: [
                            {
                                data: {
                                    subreddit_name_prefixed: "r/FuckImOld"
                                }
                            },
                            {
                                data: {
                                    subreddit_name_prefixed: "r/FuckImYoung"
                                }
                            },
                        ]
                    }
                },
            });

        render(
            <Provider store={store}>
                <ChannelsMenu />
            </Provider>
        );

        const channelsMenu = screen.getByTestId('channelsMenu');
        expect(channelsMenu).toBeInTheDocument();
        expect(spy).toHaveBeenCalled();
    });

    it('renders a list of channels', async () => {
        // Spy on the useFetchChannelsQuery hook
        const spy = vi.spyOn(apiHooks, 'useFetchChannelsQuery')
            .mockReturnValue({
                error: null,
                isLoading: false,
                data: {
                    data: {
                        children: [
                            {
                                data: {
                                    subreddit_name_prefixed: "r/FuckImOld"
                                }
                            },
                            {
                                data: {
                                    subreddit_name_prefixed: "r/FuckImYoung"
                                }
                            },
                        ]
                    }
                },
            });

        render(
            <Provider store={store}>
                <ChannelsMenu />
            </Provider>
        );

        expect(mockChanelMenuItem).toHaveBeenCalledTimes(2);
        expect(mockChanelMenuItem).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                channel: "r/FuckImOld"
            })
        );
        expect(spy).toHaveBeenCalled();
    });

    it('Displays the loading icon while fetching data', async () => {
        // Spy on the useFetchChannelsQuery hook
        const spy = vi.spyOn(apiHooks, 'useFetchChannelsQuery')
            .mockReturnValue({
                error: null,
                isLoading: true,
                data: null,
            });

        render(
            <Provider store={store}>
                <ChannelsMenu />
            </Provider>
        );

        const loadingIndicator = screen.getByText('Loading...');
        expect(loadingIndicator).toBeInTheDocument();
        expect(spy).toHaveBeenCalled();
    });

    it('dislpays error message when triggered', async ()=>{
        vi.spyOn(apiHooks, 'useFetchChannelsQuery')
        .mockReturnValue({
            error: {message: 'fetching error'},
            isLoading: false,
            data: null
        })
        render(
            <Provider store={store}>
                <ChannelsMenu/>
            </Provider>
        )
        const errorMessage = await screen.findByTestId('errorMessage');
        expect(errorMessage).toHaveTextContent('Error Loading ...')
    })
});



// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { beforeEach, describe, expect, it, vi } from "vitest";
// import { store, useFetchChannelsQuery } from "../store";
// import ChannelsMenu from "./ChannelsMenu";

// // import ChannelMenuItem from "./ChannelMenuItem";

// vi.mock("../store/apis/recordsApi", async (importOriginal) => {
//     const actual = await importOriginal()
//     return {
//         ...actual,
//         useFetchChannelsQuery: vi.fn().mockReturnValue({
//             error: null,
//             isLoading: false,
//             data: {
//                 data: {
//                     children: [
//                         {
//                             data: {
//                                 subreddit_name_prefixed: "r/FuckImOld"
//                             }
//                         },
//                         {
//                             data: {
//                                 subreddit_name_prefixed: "r/FuckImYoung"
//                             }
//                         },
//                     ]
//                 }
//             },
//         })
//     }
// });

// const mockChanelMenuItem = vi.fn();

// vi.mock('./ChannelMenuItem', () => {
//     return {
//         default: (props) => {
//             mockChanelMenuItem(props);
//             return <div>{props.channel}</div>
//         }
//     }
// });



// describe('ChannelsMenu', () => {

//     beforeEach(() => {
//         vi.clearAllMocks();
//     })

//     it('renders the component', () => {

//         render(
//             <Provider store={store}>
//                 <ChannelsMenu />
//             </Provider>
//         )
//         screen.debug();
//         const channelsMenu = screen.getByTestId('channelsMenu');
//         expect(channelsMenu).toBeInTheDocument()
//     });

//     it('renders a list of channels', async () => {

//         render(
//             <Provider store={store} >
//                 <ChannelsMenu />
//             </Provider>
//         )
//         screen.debug()
//         expect(mockChanelMenuItem).toHaveBeenCalledTimes(2);
//         expect(mockChanelMenuItem).toHaveBeenNthCalledWith(
//             1,
//             expect.objectContaining(
//                 {
//                     channel: "r/FuckImOld"
//                 }
//             )
//         )
//     });

//     it('Displays the loading icon while fetching data', () => {

//         render(
//             <Provider store={store} >
//                 <ChannelsMenu />
//             </Provider>
//         );
        
//     })
// });