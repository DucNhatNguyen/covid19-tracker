import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LineChart from '../Charts/LineChart/index'
import HighMaps from '../Charts/HighMap/index';

function Summary({report, selectedCountryID}) {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if(selectedCountryID){
            import(
                `@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`
            ).then(res => setMapData(res))
            .catch((err) => console.log({err}));
        }
    }, [selectedCountryID]);



    return (
        <div style={{ height: '500px', marginTop: 10 }}>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Summary;