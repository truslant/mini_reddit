import * as constants from '../appConstants'

export function sxStyles(drawerIsOpen) {
    return {
        drawer: {
            width: constants.drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: constants.drawerWidth,
                boxSizing: 'border-box',
            }
        },
        toolbar: {
            position: 'sticky',
            top: 0,
            zIndex: 11,
            bgcolor: 'background.default',
        },
        iconButton: {
            mr: 2,
            display: drawerIsOpen ? 'relative' : 'none',
        },
        list: {
            overflowX: 'hidden',
            overflowY: 'auto',
        }
    }
}