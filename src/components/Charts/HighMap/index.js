import React, { useEffect, useRef, useState } from 'react';
import Highchart, { map } from 'highcharts';
import HighchartReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep, values } from 'lodash';

highchartsMap(Highchart);

const initOptions = {
    chart: {
      height: '500',
    },
    title: {
      text: null,
    },
    mapNavigation: { // keo trong map
      enabled: true,
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.2, '#FFC4AA'],
        [0.4, '#FF8A66'],
        [0.6, '#FF392B'],
        [0.8, '#B71525'],
        [1, '	#7A0826'],
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
    },
    series: [
      {
        name: 'Dân số',
        joinBy: ['hc-key', 'key'],
      },
    ],
  };






function HighMaps({mapData}) {
    const [options, setOptions] = useState({});
    const chartRef = useRef(null);
    const [configLoaded, setConfigLoaded] = useState(false);

    useEffect(() => {
        if(mapData && Object.keys(mapData).length){
            const fakeData = mapData.features.map((feature, index) => ({
                key: feature.properties['hc-key'],
                value: index,
            }));
            setOptions({
                ...initOptions,
                title:{
                    text: mapData.title,
                },
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: fakeData,
                    }
                ]
            });
            if(!configLoaded) setConfigLoaded(true);
        }
    }, [mapData, configLoaded]);

    useEffect(() => {
        if(chartRef && chartRef.current){
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [options,mapData]);

    if(!configLoaded) return null;



    return (
        <HighchartReact 
            highchart={Highchart}
            options={cloneDeep(options)}
            constructorType = {'mapChart'}
            ref={chartRef}
        />
    );
}
HighMaps.defaultProps = {
    mapData: {},
  };
export default React.memo(HighMaps);