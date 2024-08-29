import { useEffect } from 'react';
import { useFetchChannelsQuery } from '../store';

import { useDispatch, useSelector } from 'react-redux';
import { changeChannel, drawerToggle } from '../store';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { produceChannelsList } from './componentFunctions';

import { sxStyles } from './ChannelsMenuStyles';

export default function ChannelsMenu() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const channelFetchResult = useFetchChannelsQuery();
    const channels = produceChannelsList(channelFetchResult, 'subreddit_name_prefixed');
    const drawerIsOpen = useSelector(state => state.drawer);
    const dispatch = useDispatch();

    useEffect(() => {
        !channelFetchResult.isLoading
            && !channelFetchResult.error
            && dispatch(changeChannel(channelFetchResult.data.data.children[0].data.subreddit_name_prefixed))
    }, [channelFetchResult.isLoading]);

    useEffect(() => {
        if (!isSmallScreen) {
            dispatch(drawerToggle(true));
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
            sx={sxStyles(drawerIsOpen).drawer}
            variant={isSmallScreen ? "temporary" : "persistent"}
            anchor="left"
            open={drawerIsOpen}
            data-testid="channelsMenu"
            onClose={handleDrawerClick}
        >

            <Toolbar
                sx={sxStyles(drawerIsOpen).toolbar}
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={sxStyles(drawerIsOpen)}
                    onClick={handleDrawerClick}
                >
                    <MenuOpenIcon />
                </IconButton>
            </ Toolbar>
            <List
                sx={sxStyles(drawerIsOpen).list}>
                {channels}
            </List>
        </Drawer>
    )
}
