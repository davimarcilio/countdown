
import './styles/CountDown.css';
import TopImage from './assets/images/top-image.svg'
import BottomImage from './assets/images/bottom-image.svg';
import Rocket from './assets/images/rocket.svg';
import Count from './components/Count';
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux';
import countDownReducer from './features/countdown/countdownSlice';

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore({
  reducer: { countdown: countDownReducer }
})

export default function CountDown() {
  const countdownseconds = useSelector(state => state)
  console.log(countdownseconds);

  return (
    <div >

      <div className='h-screen flex flex-row justify-evenly items-center'>
        <div className='flex flex-col font-Poppins justify-center items-center'>
          <h1 className='text-[#6C63FF] mb-5 text-4xl font-bold tracking-widest	'>READY TO LAUNCH IN...</h1>
          <div className='flex gap-4 text-center  font-light text-sm text-[#C8C8C8]'>
            <Provider store={store} serverState={preloadedState}>
              <Count countname={"Dias"} number={"00"}></Count>
              <Count countname={""} number={":"}></Count>
              <Count countname={"Horas"} number={"00"}></Count>
              <Count countname={""} number={":"}></Count>
              <Count countname={"Minutos"} number={"00"}></Count>
              <Count countname={""} number={":"}></Count>
              <Count countname={"Segundos"} number={"00"}></Count>
            </Provider>
          </div>
          <div className='flex flex-col justify-center items-center w-full mt-11'>
            <p className='text-[#9C9AB6] text-sm'>Inscreva-se para saber mais sobre o lancamento</p>
            <button className='mt-8 px-8 py-3 bg-[#6C63FF] rounded-xl text-white text-base font-normal'>Inscreva-se</button>
          </div>
        </div>
        <img className='h-fit' src={Rocket} alt="rocket" />
      </div>

      <img className='fixed bottom-0 -z-10 w-screen' src={BottomImage} alt="background bottom page" />
      <img className='fixed top-0 -z-10 w-screen' src={TopImage} alt="background top page" />
    </div>
  );
}


