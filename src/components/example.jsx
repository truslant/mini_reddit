import React, { useState } from 'react';
import { useFetchPostCommentsQuery } from './recordsApi';
import Comment from './Comment';

const CommentsWall = ({ postUrl }) => {
    const [limit, setLimit] = useState(25); // Number of comments to load initially
    const [after, setAfter] = useState(null); // Track the last comment ID
    const [comments, setComments] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data, error, isLoading } = useFetchPostCommentsQuery({ postUrl, limit, after });

    // Update comments when data changes
    React.useEffect(() => {
        if (data) {
            setComments(prevComments => [...prevComments, ...data[1].data.children]);
            const lastComment = data[1].data.children[data[1].data.children.length - 1];
            setAfter(lastComment ? lastComment.data.name : null); // Set the 'after' token
        }
    }, [data]);

    const loadMoreComments = () => {
        setIsLoadingMore(true);
        setLimit(prevLimit => prevLimit + 25);
    };

    return (
        <div>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
            {isLoading || isLoadingMore ? (
                <p>Loading...</p>
            ) : (
                <button onClick={loadMoreComments}>Load More Comments</button>
            )}
            {error && <p>Error loading comments...</p>}
        </div>
    );
};

export default CommentsWall;


fetchPostComments: builder.query({
    query: ({ postUrl, limit = 25, after = null }) => {
        return {
            url: `${postUrl}.json ? limit=${limit}${after ? `&after=${after}` : ''}`,
            method: 'GET'
        }
    }
})


    < LoadingButton
size = "small"
onClick = { handleClick }
loading = { loading }
loadingIndicator = "Loading…"
variant = "outlined"
    >
    <span>Fetch data</span>
        </LoadingButton >