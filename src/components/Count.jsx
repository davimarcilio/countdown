import React from 'react'
export default function Count(props) {
    return (
        <div>
            <p >{props.countname}<br /> <br /><b className='font-normal text-7xl text-[#4D4C59]'>{props.number}</b></p>
        </div>
    )
}
