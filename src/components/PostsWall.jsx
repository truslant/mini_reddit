import Post from './Post'
import { useSelector } from 'react-redux';
import { useFetchFoundRecordsQuery } from '../store';
import { useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

import Skeleton from '@mui/material/Skeleton';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import PostsLoader from './PostsLoader';

import { sxStyles } from './PostsWallStyles';

export default function PostsWall() {

    const channel = useSelector(state => state.channel);

    const { data, error, isLoading, isFetching } = useFetchFoundRecordsQuery(channel, { skip: !channel });

    const searchQuote = useSelector(state => state.searchQuote);

    const drawerIsOpen = useSelector(state => state.drawer);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const postsContainerRef = useRef(null);
    useEffect(() => {
        if (postsContainerRef.current) {
            postsContainerRef.current.scrollTop = 0;
        }
    }, [channel])

    if (channel) {
        let posts;
        if (isLoading || isFetching) {
            posts = <PostsLoader number={5} />;
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
                ref={postsContainerRef}
                component="main"
                sx={sxStyles(drawerIsOpen, isSmallScreen).box}
                data-testid='postsWall'
            >
                <Toolbar />

                <Typography variant='h4' component='h4' data-cy='channelDisplay'>
                    {channel}
                </Typography>
                {posts}
            </Box>
        )
    } else {
        return (
            <Box
                ref={postsContainerRef}
                component="main"
                sx={sxStyles(drawerIsOpen, isSmallScreen).box}
                data-testid='postsWall'
            >
                <Toolbar />
                <Skeleton
                    animation="wave"
                    height={45}
                    width={280}
                    sx={{ p: { xs: 1, md: 3 }, }}
                />
                <PostsLoader number={5} />
            </Box>
        )
    }
}