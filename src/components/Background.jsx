import React from 'react'
import TopImage from '../assets/images/top-image.svg';
import BottomImage from '../assets/images/bottom-image.svg';
export default function Background() {
    return (
        <div>
            <img className='fixed bottom-0 -z-10 w-screen' src={BottomImage} alt="background bottom page" />
            <img className='fixed top-0 -z-10 w-screen' src={TopImage} alt="background top page" />
        </div>
    )
}
