import React from 'react'
import { useSelector } from 'react-redux';
import rocketLoading from '../assets/images/rocketLoading.gif'

export default function Loading() {

    const loading = useSelector(state => state.countdown.loading);
    return (

        <div className={`absolute w-screen h-screen justify-center items-center flex bg-white ${!loading ? 'hidden' : ''}`}>
            <img className='w-1/3' src={rocketLoading} alt="rocket" />
        </div>

    )
}
