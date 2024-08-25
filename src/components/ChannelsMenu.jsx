import { useEffect } from 'react';
import { useFetchChannelsQuery } from '../store';
import ChannelMenuItem from './ChannelMenuItem';

import { useDispatch, useSelector } from 'react-redux';
import { changeChannel, drawerToggle } from '../store';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import RedditIcon from '@mui/icons-material/Reddit';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Skeleton from '@mui/material/Skeleton';

import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const channelLoader = (number) => {
    const dummyArray = new Array(number).fill(null);
    return dummyArray.map((_, index) => (
        <ListItem disablePadding key={index}>
            <ListItemButton >
                <ListItemIcon>
                    <RedditIcon />
                </ListItemIcon>
                <ListItemText primary={
                    <Skeleton animation="wave" height={24} width={130} />
                }
                />
            </ListItemButton>
        </ListItem>
    ))
}

function produceChannelsList(channelFetchResult, propertyToFetch) {
    let fetchedData;
    if (channelFetchResult.isLoading || channelFetchResult.isFetching) {
        fetchedData = channelLoader(20)
    } else if (channelFetchResult.error) {
        fetchedData = (<h1 data-testid='errorMessage'>Error Loading ...</h1>)
    } else {
        //using set to eliminate dublicates of channels
        fetchedData = [];
        const setOfChannels = new Set();
        channelFetchResult.data.data.children.forEach(post => {
            setOfChannels.add(post.data[propertyToFetch]);
        });

        setOfChannels.forEach(channel => fetchedData.push(<ChannelMenuItem key={channel} channel={channel} />))
    }
    return fetchedData;
}

const drawerWidth = 240;

export default function ChannelsMenu() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const channelFetchResult = useFetchChannelsQuery();
    const channels = produceChannelsList(channelFetchResult, 'subreddit_name_prefixed');
    const drawerIsOpen = useSelector(state => state.drawer);
    const dispatch = useDispatch();

    useEffect(() => {
        !channelFetchResult.isLoading && !channelFetchResult.error && dispatch(changeChannel(channelFetchResult.data.data.children[0].data.subreddit_name_prefixed))
    }, [channels, channelFetchResult, dispatch]);

    useEffect(() => {
        if (isSmallScreen) {
            dispatch(drawerToggle(false));
        }
    }, []);

    const handleDrawerClick = () => {
        dispatch(drawerToggle(false))
    }
    // data->children->[array num]->data->score => number of votes
    // data->children->[array num]->data->author => author of the post
    // data->children->[array num]->data->subreddit_name_prefixed => subreddit topic
    // data->children->[array num]->data->thumbnail => link to preview image
    // data->children->[array num]->data->title => record title
    // data->children->[array num]->data->ups => upvotes count
    // data->children->[array num]->data->ups => upvotes count

    return (
        <Drawer
            sx={{
                width: drawerWidth,

                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={drawerIsOpen}
            data-testid="channelsMenu"
            onClose={handleDrawerClick}

        >

            <Toolbar
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100, // Adjust zIndex to be above other elements if necessary
                    bgcolor: 'background.default', // Set background color
                }}
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        mr: 2,
                        display: drawerIsOpen ? 'relative' : 'none',
                    }}
                    onClick={handleDrawerClick}

                >
                    <MenuOpenIcon />
                </IconButton>
            </ Toolbar>
            <List
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}>
                {channels}
            </List>
        </Drawer>
    )
}
