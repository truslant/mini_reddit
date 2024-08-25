import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeSearchQuote, drawerToggle } from '../store';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const drawerWidth = 240;

export default function NavMenu() {

    const dispatch = useDispatch();
    const searchQuoteValue = useSelector(state => state.searchQuote)
    const currentChannel = useSelector(state => state.channel)
    const drawerIsOpen = useSelector(state => state.drawer)

    function handleChange(event) {
        dispatch(changeSearchQuote(event.target.value));
    }

    const handleDrawerClick = () => {
        dispatch(drawerToggle(true))
    }

    return (

        <AppBar
            position="fixed"
            sx={{ 
                width: drawerIsOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
                ml: drawerIsOpen ? `${drawerWidth}px` : 0,
                transition: 'width 0.3s ease'
            }}
            data-testid='navmenu'
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        mr: 2,
                        display: drawerIsOpen ? 'none' : 'relative',
                    }}
                    onClick={handleDrawerClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: 500
                    }}

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