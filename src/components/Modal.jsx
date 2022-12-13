import React from 'react'
import Close from '../assets/images/x-circle-fill.svg'
import { useDispatch, useSelector } from 'react-redux';
import { modalState } from '../features/countdown/countdownSlice';
export default function Modal() {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.countdown.modal);
    function hideModal(e) {
        if (e.target.id === "modal") {
            dispatch(modalState(false));
        }
    }


    return (
        <div id='modal' onClick={hideModal} className={`${modal ? '' : 'hidden'} font-Poppins flex-col gap-7 bg-white absolute w-screen h-screen justify-center items-center flex`}>
            <img onClick={() => dispatch(modalState(false))} className='absolute top-0 right-0 w-20 m-6 cursor-pointer' src={Close} alt="close" />
            <h1 className='text-2xl font-bold '>Inscreva-se para receber atualizações sobre o próximo foguete a ser lançado.</h1>
            <form className='flex flex-row gap-20 max-w-lg w-full'>
                <input className='bg-white shadow-lg transition-all text-black placeholder:text-gray-400 py-2 px-6 w-full ring-1 focus:outline-none focus:ring-2  empty:ring-purple-300 invalid:ring-red-300 valid:ring-green-300' type="email" placeholder='EMAIL:' required />
                <input className='transition-all hover:bg-[#554dff] bg-purple-500 text-white font-bold py-2 px-5 rounded-md cursor-pointer ' type="submit" value={"inscreva-se"} />
            </form>
        </div>
    )
}
