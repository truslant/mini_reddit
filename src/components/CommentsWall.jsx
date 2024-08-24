import PropTypes from 'prop-types'
import { useFetchPostCommentsQuery } from '../store';
import Comment from './Comment';

import LoadingButton from '@mui/lab/LoadingButton';

import { useEffect } from 'react';
import { useState } from 'react';

//data[0] -> data about the post itself
//data[1] - data about the comments to the post
//data[1]->data->children[array num]->data->author => comment author
//data[1]->data->children[array num]->data->created => comment creation date in Unix format
//data[1]->data->children[array num]->data->body => comment text

export default function CommentsWall({ link }) {

    const limit = 5;

    const [after, setAfter] = useState(null);
    const [comments, setComments] = useState([]);

    const { data, error, isLoading, isFetching, refetch } = useFetchPostCommentsQuery({ postUrl: link, limit, after });
    useEffect(() => {
        if (data) {
            const newSet = new Set();
            comments && comments.forEach(comment => newSet.add(comment));
            data[1].data.children.forEach(commentObj => newSet.add(commentObj));
            const newArray = [...newSet];
            newArray.pop();
            // console.log("newArray", newArray);
            setComments(newArray);
            const lastComment = newArray[newArray.length - 1];
            setAfter(lastComment ? lastComment.data.name : null)
        }
    }, [data]);

    const loadMore = () => {
        refetch();
    }

    return (
        < >
            {console.log("comments", comments)}
            {data && comments.map(comment => {
                console.log("comment", comment);
                return <Comment comment={comment} key={comment.data.name} />
            })}
            {comments && (
                <LoadingButton
                    size="small"
                    onClick={loadMore}
                    loading={isLoading || isFetching}

                    variant="outlined"
                >
                    <span>More comments</span>
                </LoadingButton>
            )}
            {error && <p>Error loading comments...</p>}
        </>
    )
}

CommentsWall.propTypes = {
    link: PropTypes.string.isRequired,
}

