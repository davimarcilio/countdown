
import './styles/CountDown.css';
import TopImage from './assets/images/top-image.svg'
import BottomImage from './assets/images/bottom-image.svg';
import Rocket from './assets/images/rocket.svg';

export default function CountDown() {
  return (
    <div >

      <div className='h-screen flex flex-row justify-evenly items-center'>
        <div className='flex flex-col font-Poppins justify-center items-center'>
          <h1 className='text-[#6C63FF] mb-5 text-4xl font-bold tracking-widest	'>READY TO LAUNCH IN...</h1>
          <div className='flex gap-4 text-center  font-light text-sm text-[#C8C8C8]'>
            <p className=''>Dias<br /> <br /><b className='font-normal text-7xl text-[#4D4C59]'>00</b></p>
            <p className='font-normal text-7xl text-[#4D4C59] mt-9'>:</p>
            <p>Horas<br /> <br /><b className='font-normal text-7xl text-[#4D4C59]'>00</b></p>
            <p className='font-normal text-7xl text-[#4D4C59] mt-9'>:</p>
            <p>Minutos<br /> <br /><b className='font-normal text-7xl text-[#4D4C59]'>00</b></p>
            <p className='font-normal text-7xl text-[#4D4C59] mt-9'>:</p>
            <p>Segundos<br /> <br /><b className='font-normal text-7xl text-[#4D4C59]'>00</b></p>
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


