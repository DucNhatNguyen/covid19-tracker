import React, { useEffect, useState } from 'react';
import HighChartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {ButtonGroup, Button} from '@material-ui/core';

const generateOptions = (data) => {
    const categories = data.map(item => item.Date);

    return {
        chart: {
          height: 500,
        },
        title: {
          text: 'Tổng ca nhiễm',
        },
        xAxis: {
          categories: categories,
          crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
          min: 0,
          title: {
            text: null,
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: 'Tổng Ca nhiễm',
            data: data.map((item) => item.Confirmed),
          },
        ],
      };
}

function LineChart({data}) {
  const [option, setOption] = useState({}); // empty object
  const [reportStyle, setReportStyle] = useState('all');

  let custom = [];
  useEffect(() => {
    switch (reportStyle) {
      case 'all':
        custom = data;
        break;
      case '30':
        custom = data.slice(data.length - 30);
        break;
      case '7':
        custom = data.slice(data.length - 7);
        break;
      default:
        custom = data;
        break;
    }

    setOption(generateOptions(custom))
  }, [data, reportStyle]);



    return (
        <div>
          <ButtonGroup 
            size='small' 
            style={{display: 'flex', justifyContent: 'flex-end'}}
          >
            <Button 
              color={reportStyle === 'all' ? 'secondary' : ''}
              onClick={() => setReportStyle('all')}
            >
                All
            </Button>

            <Button 
              color={reportStyle === '30' ? 'secondary' : ''}
              onClick={() => setReportStyle('30')}
            >
              30 days
            </Button>

            <Button
              color={reportStyle === '7' ? 'secondary' : ''}
              onClick={() => setReportStyle('7')}
            >
              7 days
            </Button>
          </ButtonGroup>
            <HighChartsReact 
                highcharts={Highcharts}
                options={option}
            />
        </div>
    );
}

export default LineChart;