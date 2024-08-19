import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Post from "./Post";
import { Provider } from "react-redux";
import { store } from "../store";
import userEvent from "@testing-library/user-event";

const mockPost = vi.fn();
vi.mock('./CommentsWall',()=>{
    return {
        default: (props)=>{
            mockPost(props)
            return (
                <div>
                    {props.link}
                </div>
            )
        }
    }
});

describe('Post', () => {
    const post = {
        data: {
            title: 'Post 1 title',
            author: 'Post1 Author',
            created: '1723932443',
            thumbnail: 'https://www.microsoft.com',
            ups: 999,
            num_comments: 777,
            permalink: "google.com"
        }
    }

    it('renders the component', () => {
        render(
            <Provider store={store}>
                <Post post={post} />
            </Provider>
        )
        const singlePost = screen.getByTestId('post');
        expect(singlePost).toBeInTheDocument();
    });

    it('renders comments wall', async ()=>{
        const user= userEvent.setup();
        render(
            <Provider store={store}>
                <Post post={post}/>
            </Provider>
        )
        const commentsButton = screen.getByTestId('commentsButton');
        await user.click(commentsButton);
        expect(mockPost).toBeCalledTimes(1);
        expect(mockPost).toBeCalledWith({
            link: "google.com"
        })
    })

});