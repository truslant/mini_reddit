import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Comment from "./Comment";

describe('Comment', () => {
    const postComment = {
        data: {
            author: 'Comment Author',
            created: 1670438956,
            body: 'Comment body'
        }
    }
    it('renders the component', async () => {
        render(
            <Comment comment={postComment} />
        )
        const comment = screen.getByTestId('comment');
        const author = await screen.findByTestId('commentAuthor');
        const authorAvatar = await screen.findByTestId('authorInitials');
        const commentBody = await screen.findByTestId('commentBody');
        expect(comment).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(author).toHaveTextContent('Comment Author');
        expect(authorAvatar).toBeInTheDocument();
        expect(authorAvatar).toHaveTextContent('C');
        expect(commentBody).toBeInTheDocument();
        expect(commentBody).toHaveTextContent('Comment body');
    })
});