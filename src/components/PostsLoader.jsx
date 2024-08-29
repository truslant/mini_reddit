import { Fragment } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Skeleton from '@mui/material/Skeleton';

const sxStyles = {
    card: {
        width: '100%',
        marginBottom: '10px',
        minWidth: '350px'
    }
}

const PostsLoader = ({number}) => {
    const dummyArray = new Array(number).fill(null);
    return dummyArray.map((_, index) => (
        <Card sx={sxStyles.card} data-testid='loader' key={index}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                }

                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                }
            />

            <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />

            <CardContent>
                <Fragment>
                    <Skeleton animation="wave" height={10} width={200} />
                    <Skeleton animation="wave" height={10} width={200} />
                </Fragment>
            </CardContent>
        </Card>
    ))
}

export default PostsLoader