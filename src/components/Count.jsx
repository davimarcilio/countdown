import React from 'react'
export default function Count(props) {
    return (
        <div className='flex flex-col justify-center items-center'>
            <p>{props.countname}</p>
            <p > <br /><b className='font-normal text-7xl text-[#4D4C59]'>{props.number}</b></p>
        </div>
    )
}
