/* eslint-disable react/prop-types */
import { D, I, L, Q, U, Y } from "./image"
import Equivalent from "./Equivalent";


function Hero() {


  return (
    <main className='w-full h-fit flex justify-center items-center '>
      <div className='w-full flex justify-between max-lg:flex-col max-lg:gap-y-[5rem]'>

        <div className=' max-w-[46rem] max-2xl:max-w-[43rem] lg:w-[50%] w-full xl:w-full flex flex-col items-start'>
          <h1 className='md:text-[4rem] xs:text-[2.7rem] text-[2.4rem] leading-[130%] lg:-translate-y-[0.9rem] lg:w-full sm:w-[90%] w-full capitalize font-medium text-left text-secondary '>Change <span className="animation-cover md:h-[3.08rem] xs:h-[2rem] h-[1.9rem] "> <span className="animation-container"><span className='text-primary'>Dollars</span><span className='text-primary'>Pounds</span></span></span> Using only Your Email</h1>
          <h4 className='xl:w-[50%] sm:w-[70%] w-[90%] xl:text-[1.1rem] xs:text-[1rem] text-[0.9rem] text-secondary font-semibold text-left mt-1 pt-[0.3rem]'>Effortlessly Convert Dollars, Pounds to Naira – Quick, Reliable, Simple.</h4>

          <div className='xl:w-full lg:w-[90%] xl:flex hidden xl:flex-nowrap xl:items-center xl:pt-[3.5rem] pt-[3.5rem]'>
            <img src={Q} className='z-0 img -translate-x-[0.4rem]' />
            <img src={U} className='z-1 img -translate-x-[3.1rem]' />
            <img src={I} className='z-2 img -translate-x-[5.9rem]' />
            <div className='w-fit flex'>
              <img src={D} className='z-3 img xl:-translate-x-[8.55rem] ' />
              <img src={L} className='z-4 img xl:-translate-x-[11.2rem]' />
              <img src={Y} className='z-5 img xl:-translate-x-[13.9rem]' />
            </div>
          </div>
        </div>

        <Equivalent />


      </div>
    </main>
  )
}
export default Hero
