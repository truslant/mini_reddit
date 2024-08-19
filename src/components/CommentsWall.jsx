import PropTypes from 'prop-types'
import { useFetchPostCommentsQuery } from '../store';
import Comment from './Comment';

//data[0] -> data about the post itself
//data[1] - data about the comments to the post
//data[1]->data->children[array num]->data->author => comment author
//data[1]->data->children[array num]->data->created => comment creation date in Unix format
//data[1]->data->children[array num]->data->body => comment text



export default function CommentsWall({ link }) {
    const { data, error, isLoading, isFetching } = useFetchPostCommentsQuery(link);

    let comments;
    if (isLoading || isFetching) {
        comments = <h5 data-testid='loader'>Loading...</h5>
    } else if (error) {
        comments = <h5 data-testid='errorMessage'>Loading error...</h5>
    } else {
        comments = data[1].data.children.map(comment => <Comment comment={comment} key={comment.data.id} data-testid='comment'/>)
    }

    return (
        < >
            {comments}
        </>
    )
}

CommentsWall.propTypes = {
    link: PropTypes.string.isRequired,
}

