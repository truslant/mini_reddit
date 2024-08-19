import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { store } from '../store/index'
import CommentsWall from './CommentsWall'
import * as apiHooks from '../store/index'

const mockComment = vi.fn();
vi.mock("./Comment", () => {
    return {
        default: (props) => {
            mockComment(props);
            return (
                <div data-testid='comment'>
                    {props.comment.data.id}
                </div>
            )
        }
    }
})

describe('CommentsWall', () => {

    it('renders the component', () => {
        vi.spyOn(apiHooks, 'useFetchPostCommentsQuery').mockReturnValue({
            isLoading: true,
            isFetching: false,
            error: null,
            data: null
        })
        render(
            <Provider store={store}>
                <CommentsWall link='www.google.com' />
            </Provider>
        )
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    })

    it('checks if the error is displayed', () => {
        vi.spyOn(apiHooks, 'useFetchPostCommentsQuery').mockReturnValue({
            isLoading: false,
            isFetching: false,
            error: { message: 'Server error' },
            data: null
        });

        render(
            <Provider store={store}>
                <CommentsWall link="www.google.com" />
            </Provider>
        )
        const error = screen.getByTestId('errorMessage');
        const loader = screen.queryByTestId('loader');
        expect(error).toBeInTheDocument();
        expect(loader).not.toBeInTheDocument();
    })

    it('displays comments', async () => {
        vi.spyOn(apiHooks, 'useFetchPostCommentsQuery').mockReturnValue({
            isFetching: false,
            isLoading: false,
            error: null,
            data: [
                {},
                {
                    data: {
                        children: [
                            {
                                data: {
                                    id: 'First Comment'
                                }
                            },
                            {
                                data: {
                                    id: 'Second Comment'
                                }
                            }
                        ]
                    }
                }
            ]
        });

        render(
            <Provider store={store}>
                <CommentsWall link="www.google.com" />
            </Provider>
        )
        const comments = await screen.findAllByTestId('comment');
        expect(comments).toHaveLength(2);
        expect(comments[1]).toHaveTextContent('Second Comment');
    })
})