
import './styles/CountDown.css';
import TopImage from './assets/images/top-image.svg';
import BottomImage from './assets/images/bottom-image.svg';
import Rocket from './assets/images/rocket.svg';
import Count from './components/Count';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { realTime } from './features/countdown/countdownSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
moment().format();


export default function CountDown() {

  var nextRocketLaunchDateVar;
  const [launchState, setlaunchState] = useState(false)
  const dispatch = useDispatch();
  async function nextRocketLaunchDate() {
    const response = await axios.get('https://fdo.rocketlaunch.live/json/launches/next/1');
    const data = response.data;
    const nextRocketLaunchDate = moment(data.result[0].sort_date * 1000);
    return nextRocketLaunchDate;
  };
  useEffect(() => {
    nextRocketLaunchDate().then(data => nextRocketLaunchDateVar = data)
    setInterval(() => {
      let countDown = nextRocketLaunchDateVar.diff(moment());
      if (countDown < 0) {
        setlaunchState(true)
      }
      dispatch(realTime(countDown));
    }, 1000);
  }, [launchState]);


  const time = useSelector(state => state.countdown);

  return (
    <div >

      <div className='h-screen flex flex-row justify-evenly items-center'>
        <div className='flex flex-col font-Poppins justify-center items-center'>
          <h1 className='text-[#6C63FF] mb-5 text-4xl font-bold tracking-widest	'>READY TO LAUNCH IN...</h1>
          <div className='flex gap-4 text-center  font-light text-sm text-[#C8C8C8]'>

            <Count countname={"Dias"}
              number={time.date < 10 ? `0${time.date}` : time.date}></Count>
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


