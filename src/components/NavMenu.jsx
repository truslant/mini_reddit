import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeSearchQuote, drawerToggle } from '../store';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { sxStyles, Search, SearchIconWrapper, StyledInputBase } from './NavMenuStyles'

export default function NavMenu() {

    const dispatch = useDispatch();
    const searchQuoteValue = useSelector(state => state.searchQuote)
    const currentChannel = useSelector(state => state.channel)
    const drawerIsOpen = useSelector(state => state.drawer) //used for inported styles

    function handleChange(event) {
        dispatch(changeSearchQuote(event.target.value));
    }

    const handleDrawerClick = () => {
        dispatch(drawerToggle(true))
    }

    return (

        <AppBar
            position="fixed"
            sx={sxStyles(drawerIsOpen).appBar}
            data-testid='navmenu'
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={sxStyles(drawerIsOpen).iconButton}
                    onClick={handleDrawerClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={sxStyles(drawerIsOpen).logo}
                >

                    {currentChannel !== undefined ? `Reddit Mini: ` : 'Reddit Mini'}
                    <Typography
                        variant="h5"
                        noWrap
                        component="span"
                        sx={{ fontWeight: 300 }}
                    >
                        {currentChannel !== undefined && `${currentChannel}`}
                    </Typography>
                </Typography>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuoteValue}
                        onChange={handleChange}
                        data-testid='searchInput'
                        data-cy='cySearchInput'
                    />
                </Search>
            </Toolbar>
        </AppBar>
    )
}