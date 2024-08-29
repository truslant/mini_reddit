import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import * as constants from '../appConstants'

function sxStyles(drawerIsOpen) {
    return (
        {
            appBar: {
                width: drawerIsOpen ? `calc(100% - ${constants.drawerWidth}px)` : '100%',
                ml: drawerIsOpen ? `${constants.drawerWidth}px` : 0,
                transition: 'width 0.3s ease'
            },
            iconButton: {
                mr: 2,
                display: drawerIsOpen ? 'none' : 'relative',
            },
            logo: {
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                fontWeight: 500,
            }
        }
    )
}

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

export { Search, SearchIconWrapper, StyledInputBase, sxStyles }