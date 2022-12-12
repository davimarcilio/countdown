
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
import rocketLoading from './assets/images/rocketLoading.gif'
moment().format();
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
  "md-eZxyL92TNDuJ4Xs2U4qwew"
);


export default function CountDown() {

  // async function sendEmailWithRocketInfos(e) {


  //   const run = async () => {
  //     const responseRocket = await axios.get('https://fdo.rocketlaunch.live/json/launches/next/1');
  //     const data = response.data;
  //     const response = await mailchimpClient.messages.send({
  //       message: {
  //         text: data.result[0].launch_description,
  //         subject: `Missão ${data.result[0].name}`,
  //         from_email: 'davimarcilio.js@gmail.com',
  //         from_name: 'Rocket Launcher Web Site',
  //         to: 

  //       }
  //     });
  //     console.log(response);
  //     console.log(response);
  //   };

  //   run();



  // }






  const [launchState, setLaunchState] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch();
  async function nextRocketLaunchDate() {
    const response = await axios.get('https://fdo.rocketlaunch.live/json/launches/next/1');
    const data = response.data;
    const nextRocketLaunchDate = moment(data.result[0].sort_date * 1000);
    return nextRocketLaunchDate;
  };
  useEffect(() => {
    var nextRocketLaunchDateVar;
    nextRocketLaunchDate().then(data => nextRocketLaunchDateVar = data)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setInterval(() => {
      let countDown = nextRocketLaunchDateVar.diff(moment());
      if (countDown < 0) {
        setLaunchState(true)
      }
      dispatch(realTime(countDown));
    }, 1000);
  }, [launchState]);


  const time = useSelector(state => state.countdown);

  return (
    <div >
      <div className={`${modal ? '' : 'hidden'} flex-col bg-white absolute w-screen h-screen justify-center items-center flex`}>
        <h1 className='text-2xl font-bold font-Poppins'>Inscreva-se para receber atualizacoes sobre o proximo foguete a ser lancado.</h1>
        <form className='flex flex-row'>
          <input className='bg-purple-900 text-white placeholder:text-white py-2 px-6 w-full' type="email" placeholder='EMAIL:' required />
          <input type="submit" value={"inscreva-se"} />
        </form>
      </div>
      <div className={`absolute w-screen h-screen justify-center items-center flex bg-white ${!loading ? 'hidden' : ''}`}><img className='w-1/3' src={rocketLoading} alt="rocket" /></div>
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
            <p className='text-[#9C9AB6] text-sm'>Inscreva-se para saber mais sobre o lançamento</p>
            <button onClick={() => setModal(true)} className='mt-8 px-8 py-3 bg-[#6C63FF] rounded-xl text-white text-base font-normal'>Inscreva-se</button>
          </div>
        </div>
        <img className='h-fit' src={Rocket} alt="rocket" />
      </div>

      <img className='fixed bottom-0 -z-10 w-screen' src={BottomImage} alt="background bottom page" />
      <img className='fixed top-0 -z-10 w-screen' src={TopImage} alt="background top page" />
    </div>
  );
}


