import { useEffect } from 'react';
import { useFetchChannelsQuery } from '../store';
import ChannelMenuItem from './ChannelMenuItem';


import { useDispatch } from 'react-redux';
import { changeChannel } from '../store';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';


function produceChannelsList(channelFetchResult, propertyToFetch) {
    let fetchedData;
    if (channelFetchResult.isLoading) {
        fetchedData = (<h1>Loading...</h1>)
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

    const channelFetchResult = useFetchChannelsQuery();
    const channels = produceChannelsList(channelFetchResult, 'subreddit_name_prefixed');

    const dispatch = useDispatch();

    useEffect(() => {
        !channelFetchResult.isLoading && !channelFetchResult.error && dispatch(changeChannel(channelFetchResult.data.data.children[0].data.subreddit_name_prefixed))
    }, [channels, channelFetchResult, dispatch]);

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
            variant="permanent"
            anchor="left"
            data-testid="channelsMenu"
        >
            <Toolbar />
            <Divider />
            <List>
                {channels}
            </List>
        </Drawer>
    )
}
