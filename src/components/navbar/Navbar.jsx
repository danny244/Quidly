import { Link } from "react-router-dom"
import { tableimage } from "../svg"

function Navbar() {
  return (
    <nav className='flex items-center justify-between w-full xl:pt-[3rem] gap-[1rem] lg:pt-[2.7rem] pt-[3rem]  '>

      <Link to='/' className='xs:text-[2rem] text-[1.8rem] cursor-pointer font-semibold text-primary '>Quidly</Link>

      {/* <Link to='/dashboard' className='border-primary border-2 rounded-[10px] md:text-[0.8rem] text-[0.7rem] uppercase text-secondary md:px-16 md:py-2 xs:px-7 xs:py-[0.4rem] px-5 py-[0.5rem] font-medium '>Sign in</Link> */}

      <div className='flex items-center sm:gap-3 gap-1'>
        <img src={tableimage} className='w-[1.2rem]' />
        <div className='flex flex-col font-normal items-start cursor-pointer'>
          <p className='text-[#E2AC1A] text-[0.9rem]'>@Jesse_jags</p>
          <p className='text-[0.7rem] text-tertiary'>jesse.jags@chocl8city.com</p>
        </div>
      </div>

    </nav>
  )
}

export default Navbar