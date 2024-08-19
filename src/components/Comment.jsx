import PropTypes from 'prop-types'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatDistanceToNowStrict } from 'date-fns';

const getRelativeTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return `${formatDistanceToNowStrict(date)} ago`;
};

//data[1]->data->children[array num]->data->author => comment author
//data[1]->data->children[array num]->data->created => comment creation date in Unix format
//data[1]->data->children[array num]->data->body => comment text

export default function Comment({ comment }) {
    return (
        <Card sx={{ width: '100%', marginBottom: '10px' }} data-testid='comment'>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" data-testid='authorInitials'>
                        {comment.data.author[0]}
                    </Avatar>
                }

                title={comment.data.author}
                // todo: relative-time-format to implement here
                subheader={getRelativeTime(comment.data.created)}
                data-testid='commentAuthor'
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary" data-testid='commentBody'>
                    {comment.data.body}
                </Typography>
            </CardContent>

        </Card>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}