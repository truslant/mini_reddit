import Post from './Post'
import { useSelector } from 'react-redux';
import { useFetchFoundRecordsQuery } from '../store';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

export default function PostsWall() {
    const channel = useSelector(state => {
        return state.channel
    });

    const { data, error, isLoading, isFetching } = useFetchFoundRecordsQuery(channel);
    // console.log(data, error, isLoading);

    const searchQuote = useSelector(state => state.searchQuote);

    let posts;
    if (isLoading || isFetching) {
        posts = <h3 data-testid='loader'>Loading...</h3>
    } else if (error && error.message) {
        posts = <h3 data-testid='error'>Error Loading Posts...</h3>
    } else {
        const filteredData = data.data.children.filter(post => post.data.title.includes(searchQuote))
        posts = filteredData.map(post => <Post key={post.id} post={post} />)
    }

    // data->children->[array num]->data->score => number of votes
    // data->children->[array num]->data->author => author of the post
    // data->children->[array num]->data->subreddit_name_prefixed => subreddit topic
    // data->children->[array num]->data->thumbnail => link to preview image
    // data->children->[array num]->data->title => record title
    // data->children->[array num]->data->ups => upvotes count

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            data-testid='postsWall'
        >
            <Toolbar />
            <Typography variant='h2' component='h2'>
                {channel}
            </Typography>
            {posts}
        </Box>
    )
}

