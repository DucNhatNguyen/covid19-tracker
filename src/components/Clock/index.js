import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';


moment.locale('vi')

function formatDate(date){
   
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);


    return moment().format('LL') + ` ${hours}:${minutes}:${second}`;
}

function Clock() {
    const [timeString, setTimeString] = useState('');


    useEffect(() => {
        const clockInterval = setInterval(() => { // se chay sau moi giay, can clear interval, neu ko se error unMount
            const now = new Date();
            const newTimeString = formatDate(now); // format HH:mm:ss

            setTimeString(newTimeString);
        }, 1000)

        return () => {
            console.log('Clock cleanup')
            clearInterval(clockInterval)
        }
    }, []);

    return (
        <Typography>
            {timeString}
        </Typography>
    );
}

export default Clock;