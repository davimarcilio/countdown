
import './styles/CountDown.css';
import TopImage from './assets/images/top-image.svg';
import BottomImage from './assets/images/bottom-image.svg';
import Rocket from './assets/images/rocket.svg';
import Close from './assets/images/x-circle-fill.svg'
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
  const [email, setEmail] = useState("")
  const [modal, setModal] = useState(false)
  const [modalEmail, setModalEmail] = useState(false);
  const [modalEmailVerify, setModalEmailVerify] = useState(false);
  function hideModal(e) {
    if (e.target.id === "modal") {
      setModal(false);
    }
  }
  async function sendEmailWithRocketInfos(e) {
    e.preventDefault();

    const run = async () => {
      const responseRocket = await axios.get('https://fdo.rocketlaunch.live/json/launches/next/1');
      const dataRocket = responseRocket.data;
      const response = await mailchimpClient.messages.send({
        message: {
          text: dataRocket.result[0].launch_description,
          subject: `Missão ${dataRocket.result[0].name}`,
          from_email: 'davimarcilio.js@gmail.com',
          from_name: 'Rocket Launcher Web Site',
          to: [{
            email: email
          }],



        }
      });
      console.log(response);
      setModalEmail(true);
      if (response[0].status === 'rejected' || response[0].status === 'invalid') {
        setModalEmailVerify(false);
      } else {
        setModalEmailVerify(true);
      }
    };

    run();



  }






  const [launchState, setLaunchState] = useState(false)
  const [loading, setLoading] = useState(true)

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
      <div className={`${modalEmail ? '' : 'hidden'} absolute w-screen flex justify-center items-center my-2 z-20`} >
        <h3 className={`font-bold font-Poppins ${modalEmailVerify ? 'bg-green-400' : 'bg-red-400'}  p-10 max-w-md rounded-xl`}>{modalEmailVerify ? 'Voce recebeu o email contendo as informacoes do lancamento' : 'Não foi possivel enviar o email para voce'}</h3>
      </div>
      <div id='modal' onClick={hideModal} className={`${modal ? '' : 'hidden'} font-Poppins flex-col gap-7 bg-white absolute w-screen h-screen justify-center items-center flex`}>
        <img onClick={() => setModal(false)} className='absolute top-0 right-0 w-20 m-6 cursor-pointer' src={Close} alt="close" />
        <h1 className='text-2xl font-bold '>Inscreva-se para receber atualizacoes sobre o proximo foguete a ser lancado.</h1>
        <form className='flex flex-row gap-20 max-w-lg w-full'>
          <input onChange={(e) => setEmail(e.target.value)} className='bg-white shadow-lg transition-all text-black placeholder:text-gray-400 py-2 px-6 w-full ring-1 focus:outline-none focus:ring-2  empty:ring-purple-300 invalid:ring-red-300 valid:ring-green-300' type="email" placeholder='EMAIL:' required />
          <input onClick={sendEmailWithRocketInfos} className='bg-purple-500 text-white font-bold py-2 px-5 rounded-md cursor-pointer ' type="submit" value={"inscreva-se"} />
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


