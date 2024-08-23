import { useDispatch } from 'react-redux';
import { changeChannel } from '../store';

import ListItemText from '@mui/material/ListItemText';
import RedditIcon from '@mui/icons-material/Reddit';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function ChannelMenuItem({ channel }) {

    const dispatch = useDispatch();

    function handleClick() {
        dispatch(changeChannel(channel));
    }

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={handleClick} data-testid='changeChannelButton' data-cy='channelMenuItem'>
                <ListItemIcon>
                    <RedditIcon />
                </ListItemIcon>
                <ListItemText primary={channel} data-testid='channel'/>
            </ListItemButton>
        </ListItem>
    )
}
