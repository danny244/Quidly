import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function ExitModal({ openExitModal, ExitModalRef, setOpenExitModal }) {
  return (
    <div className={`${openExitModal ? ' visible z-[800] opacity-[1] bg-primary duration-500 bg-opacity-30 backdrop-filter backdrop-blur-sm' : 'invisible z-[-10] opacity-0 bg-opacity-0 duration-300 transition-all'} fixed top-0 left-0 w-screen h-screen transition-all duration-500 overflow-hidden flex items-center justify-center`}>
      <div ref={ExitModalRef} className='sm:w-full w-[90%] max-w-[27rem] rounded-[15px] h-fit bg-primary shadow-modal overflow-hidden z-[900]  '>
        <header className='w-full h-[4rem] flex justify-between items-center bg-secondary p-[1rem] '>
          <h5>Exit Page</h5>
        </header>
        <div className=' w-full flex flex-col gap-[0.7rem] mt-[0.4rem]'>

          <div className='mt-[1.7rem] flex flex-col p-[1rem] gap-4 items-center justify-center'>
            <Link to="/dashboard" onClick={() => setOpenExitModal(false)} className='w-full py-3 bg-tertiary text-center text-secondary text-[0.8rem] border-[#313946] border rounded-[9px]'>Exit Page</Link>
            <button onClick={() => setOpenExitModal(false)} className='w-full text-center py-3 bg-tertiary text-secondary text-[0.8rem] border-[#313946] border rounded-[9px]'>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  )
}
export default ExitModal