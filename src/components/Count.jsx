import React from 'react'
import { useDispatch } from 'react-redux';
import { realTimeSeconds } from '../features/countdown/countdownSlice'
const dispatch = useDispatch()
setInterval(() => {
    dispatch(realTimeSeconds())
}, 1000);

export default function Count(props) {
    return (
        <div>
            <p>{props.countname}<br /> <br /><b className='font-normal text-7xl text-[#4D4C59]'>{props.number}</b></p>
        </div>
    )
}
