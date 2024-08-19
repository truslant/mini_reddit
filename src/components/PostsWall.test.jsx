import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { store } from "../store";
import PostsWall from "./PostsWall";
import * as apiHooks from '../store/apis/recordsApi'
import { useSelector } from "react-redux";

const mockPost = vi.fn();
vi.mock('./Post', () => {
    return {
        default: (props) => {
            mockPost(props);
            return (
                <div data-testid='post'>
                    {props.post.data.title}
                </div>
            )
        }
    }
})

vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useSelector: vi.fn(), // Mock useSelector specifically
    };
});

describe("PostsWall", () => {

    it('renders the component', () => {
        useSelector.mockImplementation((selector) => {
            return selector({
                channel: 'mockedChannel',
                searchQuote: '',
            });
        });
        render(
            <Provider store={store}>
                <PostsWall />
            </Provider>
        )
        const postsWall = screen.getByTestId('postsWall');
        expect(postsWall).toBeInTheDocument();
    });

    it('displays loading state', () => {

        useSelector.mockImplementation((selector) => {
            return selector({
                channel: 'mockedChannel',
                searchQuote: '',
            });
        });

        vi.spyOn(apiHooks, 'useFetchFoundRecordsQuery').mockReturnValue({
            isLoading: true,
            error: null,
            isFetching: false,
            data: null
        })
        render(
            <Provider store={store}>
                <PostsWall />
            </Provider>
        )
        const loader = screen.getByTestId('loader');
        expect(loader).toHaveTextContent('Loading...')
    });

    it('displays error if triggered', async () => {

        useSelector.mockImplementation((selector) => {

            return selector({
                channel: 'mockedChannel',
                searchQuote: '',
            });
        });

        vi.spyOn(apiHooks, 'useFetchFoundRecordsQuery').mockReturnValue({
            isLoading: false,
            error: { message: 'Error' },
            data: null
        });
        render(
            <Provider store={store}>
                <PostsWall />
            </Provider>
        );
        const error = await screen.findByTestId('error');
        expect(error).toHaveTextContent('Error Loading Posts...');
    });

    it('displays posts', async () => {

        useSelector.mockImplementation((selector) => {

            return selector({
                channel: 'mockedChannel',
                searchQuote: '',
            });
        });

        vi.spyOn(apiHooks, 'useFetchFoundRecordsQuery').mockReturnValue({
            isLoading: false,
            error: null,
            data: {
                data: {
                    children: [
                        {
                            data: {
                                title: "FoundText"
                            }
                        },
                        {
                            data: {
                                title: "LostText"
                            }
                        },
                    ]
                }
            }
        })
        // props.data.title
        render(
            <Provider store={store}>
                <PostsWall />
            </Provider>
        )

        const posts = await screen.findAllByTestId('post');
        expect(posts).toHaveLength(2);
        expect(mockPost).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                post: {
                    data: {
                        title: "FoundText"
                    }
                }
            })
        )
    });

    it('triggers posts filtering', async () => {
        useSelector.mockImplementation((selector) => {
            return selector({
                channel: 'mockedChannel',
                searchQuote: 'FoundText',
            });
        });
        render(
            <Provider store={store}>
                <PostsWall />
            </Provider>
        )
        const posts = await screen.findAllByTestId('post');
        expect(posts).toHaveLength(1);
        expect(posts[0]).toHaveTextContent('FoundText');
    });
});