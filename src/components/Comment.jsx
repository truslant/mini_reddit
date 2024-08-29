import PropTypes from 'prop-types'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { getRelativeTime } from './componentFunctions';

//data[1]->data->children[array num]->data->author => comment author
//data[1]->data->children[array num]->data->created => comment creation date in Unix format
//data[1]->data->children[array num]->data->body => comment text

export default function Comment({ comment }) {
    return (
        <Card sx={{ width: '100%', marginBottom: '10px' }} data-testid='comment' data-cy='cyComment'>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" data-testid='authorInitials'>
                        {comment.data.author[0]}
                    </Avatar>
                }
                title={comment.data.author}
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