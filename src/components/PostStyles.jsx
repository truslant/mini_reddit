import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const sxStyles = {
    card: {
        width: '100%', marginBottom: '10px', minWidth: '350px'
    },
    cardMedia: {
        height: 'auto',
        width: '200px',
        marginLeft: "10px"
    }
}


export const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(() => ({
    marginLeft: 'auto',
}));