import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    wrapper: (props) => {
        if(props.type === 'confirmed') return {borderLeft: '5px solid #c9302c' };
        if(props.type === 'recovered') return {borderLeft: '5px solid #28a745' };
        else return {borderLeft: '5px solid gray'};
    },
    title:{
        fontSize: 18,
    },
    count: {
        fontWeight: 'bold',
        fontSize: 18
    }
});


function HighLightCard({title, count, type}) {
    const style = useStyles({type});


    return (
        <Card className={style.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" className={style.title}>
                    {title}
                </Typography>
                <Typography component="p" variant="body2" className={style.count}>
                    {count}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default HighLightCard;