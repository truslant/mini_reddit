import PropTypes from 'prop-types'

import React from 'react';

import CommentsWall from './CommentsWall';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CommentIcon from '@mui/icons-material/Comment';

import shortNumber from 'short-number';

import { formatDistanceToNowStrict } from 'date-fns';

const getRelativeTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return `${formatDistanceToNowStrict(date)} ago`;
};

const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(() => ({
    marginLeft: 'auto',
}));

// data from channels:
// data->children->[array num]->data->score => number of votes
// data->children->[array num]->data->author => author of the post
// data->children->[array num]->data->subreddit_name_prefixed => subreddit topic
// data->children->[array num]->data->thumbnail => link to preview image
// data->children->[array num]->data->title => record title
// data->children->[array num]->data->ups => upvotes count
// data->children->[array num]->data->id => post ID
// data->children->[array num]->data->permalink => link to post page
// data->children->[array num]->data->created => creation date in Unix format
// data->children->[array num]->data->num_comments => number of comments for the post

// plan to use relative-time-format npm module to show how long ago was the post created
// below is the JSON format for the individual posts data:
// url: www.reddit.com/permalink
//reponse contains JSON array with 2 objects in it: 1st contains data relevant to the post iself, 2nd to the comments for the post

//data[0] -> data about the post itself

//data[1] - data about the comments to the post
//data[1]->data->children[array num]->data->author => comment author
//data[1]->data->children[array num]->data->created => comment creation date in Unix format
//data[1]->data->children[array num]->data->body => comment text

export default function Post({ post }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleError = (event) => {
        event.target.style.display = 'none'
    }

    return (
        <Card sx={{ width: '100%', marginBottom: '10px' }} data-testid='post' data-cy='cyPost'>
            {/* Post author and date ('ago' format to implement) */}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.data.author[0]}
                    </Avatar>
                }

                title={post.data.author}
                // todo: relative-time-format to implement here
                subheader={getRelativeTime(post.data.created)}
            />
            <Box sx={{ display: 'flex' }}>
                {/* Card Image place */}

                <CardMedia sx={{
                    height: 'auto',
                    width: '200px',
                    marginLeft: "10px"
                }}
                    component="img"
                    src={post.data.thumbnail}
                    alt="post preview"
                    onError={handleError}
                />

                {/* Card text content */}
                <CardContent>
                    <Typography variant="h5" component="h5">
                        {post.data.title}
                    </Typography>
                </CardContent>

            </Box>

            <CardActions >

                {/* Up vote icon */}
                <IconButton aria-label="add to favorites">
                    <ArrowUpwardIcon />
                </IconButton>

                {/* implement npm i short-number for number of upvotes*/}
                {shortNumber(post.data.ups)}

                {/* Down vote icon */}
                <IconButton aria-label="share">
                    <ArrowDownwardIcon />
                </IconButton>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    data-testid='commentsButton'
                    data-cy='cyCommentsButton'
                >
                    <CommentIcon />
                </ExpandMore>
                {shortNumber(post.data.num_comments)}
            </CardActions>

            {/* Wall for comments start */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    {/* Comments start */}
                    {/* Need to create separate component for comments... maybe... */}
                    {expanded && <CommentsWall link={post.data.permalink} />}
                    {/* Comments end */}

                </CardContent>
            </Collapse>
            {/* Wall for comments end */}
        </Card>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired
}