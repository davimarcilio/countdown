
import './styles/CountDown.css';

import Rocket from './assets/images/rocket.svg';

import Counter from './components/Counter';
import Loading from './components/Loading';
import Background from './components/Background';
import Modal from './components/Modal';
import React from 'react';

import { useDispatch } from 'react-redux';
import { modalState } from './features/countdown/countdownSlice';




export default function CountDown() {


  const dispatch = useDispatch();
  return (
    <div >
      <Modal></Modal>
      <Loading></Loading>
      <div className='h-screen flex flex-row justify-evenly items-center'>
        <div className='flex flex-col font-Poppins justify-center items-center'>
          <h1 className='text-[#6C63FF] mb-5 text-4xl font-bold tracking-widest	'>READY TO LAUNCH IN...</h1>
          <Counter></Counter>
          <div className='flex flex-col justify-center items-center w-full mt-11'>
            <p className='text-[#9C9AB6] text-sm'>Inscreva-se para saber mais sobre o lançamento</p>
            <button onClick={() => dispatch(modalState(true))} className='transition-all hover:bg-[#554dff] mt-8 px-8 py-3 bg-[#6C63FF] rounded-xl text-white text-base font-normal'>Inscreva-se</button>
          </div>
        </div>
        <img className='h-fit' src={Rocket} alt="rocket" />
      </div>
      <Background></Background>

    </div>
  );
}


