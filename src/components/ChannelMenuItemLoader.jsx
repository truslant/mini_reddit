import ListItemText from '@mui/material/ListItemText';
import RedditIcon from '@mui/icons-material/Reddit';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Skeleton from '@mui/material/Skeleton';

export default function ChannelMenuItemLoader({ number }) {
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