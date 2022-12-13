import React, { useEffect, useState } from 'react'
import Count from './Count';
import { useDispatch, useSelector } from 'react-redux';
import { realTime, loadingState } from '../features/countdown/countdownSlice';
import axios from 'axios';
import moment from 'moment';
moment().format()

export default function Counter() {


    const [launchState, setLaunchState] = useState(false)


    const dispatch = useDispatch();
    useEffect(() => {

        async function nextRocketLaunchDate() {
            const response = await axios.get('https://fdo.rocketlaunch.live/json/launches/next/1');
            const data = response.data;
            const nextRocketLaunchDate = moment(data.result[0].t0);
            return nextRocketLaunchDate;
        };


        var nextRocketLaunchDateVar;

        nextRocketLaunchDate().then(data => nextRocketLaunchDateVar = data)
        setInterval(() => {


            let countDown = nextRocketLaunchDateVar.diff(moment());
            if (countDown < 0) {
                setLaunchState(true)
            }


            dispatch(realTime(countDown));


        }, 1000);
    }, [launchState]);


    const time = useSelector(state => state.countdown.value);
    useEffect(() => {
        if (time.years !== 0) {
            dispatch(loadingState(false))
        } else {
            dispatch(loadingState(true))
        }
    }, [time.years])

    return (

        <div className='flex gap-4 text-center  font-light text-sm text-[#C8C8C8]'>

            <Count countname={"Dias"}
                number={time.date < 10 ? `0${time.date - 1}` : time.date - 1}></Count>
            <Count countname={""}
                number={":"}></Count>
            <Count countname={"Horas"}
                number={time.hours < 10 ? `0${time.hours}` : time.hours}></Count>
            <Count countname={""}
                number={":"}></Count>
            <Count countname={"Minutos"}
                number={time.minutes < 10 ? `0${time.minutes}` : time.minutes}></Count>
            <Count countname={""}
                number={":"}></Count>
            <Count countname={"Segundos"}
                number={time.seconds < 10 ? `0${time.seconds}` : time.seconds}></Count>

        </div>
    )
}
