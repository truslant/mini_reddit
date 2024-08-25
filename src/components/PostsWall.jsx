import Post from './Post'
import { useSelector } from 'react-redux';
import { useFetchFoundRecordsQuery } from '../store';
import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Skeleton from '@mui/material/Skeleton';

const drawerWidth = 240;

const postsLoader = (number) => {
    const dummyArray = new Array(number).fill(null);
    return dummyArray.map((_, index) => (
        <Card sx={{ width: '100%', marginBottom: '10px' }} data-testid='loader' key={index}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }

                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                }
            />

            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />

            <CardContent>
                <Fragment>
                    <Skeleton animation="wave" height={10} width={200} />
                    <Skeleton animation="wave" height={10} width={200} />
                </Fragment>
            </CardContent>
        </Card>
    ))
}


export default function PostsWall() {
    const channel = useSelector(state => state.channel);
    const { data, error, isLoading, isFetching } = useFetchFoundRecordsQuery(channel, { skip: !channel });
    const searchQuote = useSelector(state => state.searchQuote);
    const drawerIsOpen = useSelector(state => state.drawer);

    if (channel) {
        let posts;
        if (isLoading || isFetching) {
            // posts = <h3 data-testid='loader'>Loading...</h3>
            posts = postsLoader(5);
        } else if (error && error.message) {
            posts = <h3 data-testid='error'>Error Loading Posts...</h3>
        } else {
            const filteredData = data.data.children.filter(post => post.data.title.includes(searchQuote))
            posts = filteredData.map(post => <Post key={post.data.id} post={post} />)
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
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    ml: drawerIsOpen ? 0 : `-${drawerWidth}px`,
                    transition: 'margin-left 0.3s ease'
                }}
                data-testid='postsWall'
            >
                <Toolbar />

                <Typography variant='h2' component='h2' data-cy='channelDisplay'>
                    {channel}
                </Typography>
                {posts}
            </Box>
        )
    } else {
        return (
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    ml: drawerIsOpen ? 0 : `-${drawerWidth}px`,
                    transition: 'margin-left 0.3s ease'
                }}
                data-testid='postsWall'
            >
                <Toolbar />
                <Typography variant='h2' component='h2'>
                    <Skeleton animation="wave" height={70} width={400} />
                </Typography>
                {postsLoader(5)}
            </Box>
        )
    }
}

//{ xs: 'none', sm: 'block' }
