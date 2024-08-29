import * as constants from '../appConstants'

export function sxStyles(drawerIsOpen, isSmallScreen) {
    const screenMargin = (drawerIsOpen) => {
        if (!isSmallScreen) {
            if (drawerIsOpen) {
                return 0
            } else {
                return `-${constants.drawerWidth}px`
            }
        } else {
            if (drawerIsOpen) {
                return `${constants.drawerWidth}px`
            } else {
                return 0
            }
        }
    }
    return {
        box: {
            flexGrow: 1,
            bgcolor: 'background.default',
            p: { xs: 1, md: 3 },
            ml: screenMargin(drawerIsOpen),
            transition: 'margin-left 0.3s ease',
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100vh'
        }
    }
}