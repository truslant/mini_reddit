import { useDispatch } from 'react-redux';
import { changeChannel, drawerToggle } from '../store';

import ListItemText from '@mui/material/ListItemText';
import RedditIcon from '@mui/icons-material/Reddit';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ChannelMenuItem({ channel }) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();

    function handleClick() {
        dispatch(changeChannel(channel));
        isSmallScreen && dispatch(drawerToggle(false));
    }

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={handleClick} data-testid='changeChannelButton' data-cy='channelMenuItem'>
                <ListItemIcon>
                    <RedditIcon />
                </ListItemIcon>
                <ListItemText primary={channel} data-testid='channel' />
            </ListItemButton>
        </ListItem>
    )
}
