import ChannelMenuItem from './ChannelMenuItem';
import ChannelMenuItemLoader from './ChannelMenuItemLoader';

import { formatDistanceToNowStrict } from 'date-fns';

export function produceChannelsList(channelFetchResult, propertyToFetch) {
    let fetchedData;
    if (channelFetchResult.isLoading || channelFetchResult.isFetching) {
        fetchedData = <ChannelMenuItemLoader number={20} />
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

export const getRelativeTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return `${formatDistanceToNowStrict(date)} ago`;
};