
import ListItemText from '@mui/material/ListItemText';
import RedditIcon from '@mui/icons-material/Reddit';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function ChannelMenuItem() {
    return (
        <ListItem disablePadding >
            <ListItemButton >
                <ListItemIcon>
                    <RedditIcon />
                </ListItemIcon>
                <ListItemText primary={
                    <Skeleton animation="wave" height={40} width={80} />
                }
                />
            </ListItemButton>
        </ListItem>
    )
}