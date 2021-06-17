import { Grid } from '@material-ui/core';
import React from 'react';
import HighLightCard from '../HighLight/HighLightCard';

function HighLight({report}) {
    const data = report && report.length ? report[report.length - 1] : [];

    const summary = [
        {
        title: 'Số ca nhiễm',
        count: data.Confirmed,
        type: 'confirmed',
        },
        {
        title: 'Số ca Khỏi',
        count: data.Recovered,
        type: 'recovered',
        },
        {
        title: 'Số ca Tử vong',
        count: data.Deaths,
        type: 'deaths',
        }      
    ];

    return (
        <Grid container spacing={3}>
            {summary.map((item) => (
                <Grid item sm={4} xs={12} key={item.title}>
                <HighLightCard 
                    title={item.title} 
                    count={item.count} 
                    type={item.type}
                />
                </Grid>
            ))} 
        </Grid>
    );
}

export default HighLight;