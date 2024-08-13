import { X } from "./svg"

/* eslint-disable react/prop-types */
function Details({ userTransactionDetailsModalRef, selectedItem, setUserTransactionDetailsModal, userTransactionDetailsModal }) {
  return (
    <div className={`${userTransactionDetailsModal ? ' visible z-[800] opacity-[1] bg-primary duration-500 bg-opacity-30 backdrop-filter backdrop-blur-sm' : 'invisible z-[-10] opacity-0 bg-opacity-0 duration-300 transition-all'} fixed top-0 left-0 w-screen h-screen transition-all duration-500 overflow-hidden flex items-center justify-center`}>
      <div ref={userTransactionDetailsModalRef} className='sm:w-full w-[90%] max-w-[27rem] rounded-[15px] h-fit bg-primary shadow-modal overflow-hidden z-[900]  '>

        <header className='w-full h-[4rem] flex justify-between items-center bg-secondary p-[1rem] '>
          <h5>Details</h5>
          <img src={X} onClick={() => setUserTransactionDetailsModal(false)} className="w-[1.4rem] cursor-pointer " />
        </header>

        <div className='w-full flex flex-col gap-[2rem] p-[2rem] mt-[0.4rem]'>
          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Name</h6>
            <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{selectedItem.userName}</p>
          </div>

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Exchange</h6>
            <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{selectedItem.exchange} {selectedItem.exchangeSymbol}</p>

          </div>

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Naira</h6>
            <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{selectedItem.naira} NGN</p>
          </div>

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Currency</h6>
            <div className='flex items-center gap-1'>
              <img src={selectedItem.currencyImage} className='rounded-full mt-2 overflow-hidden relative xs:h-[25px] xs:w-[25px] w-[20px] h-[20px] ' />
              <p className='text-secondary mt-2 xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{selectedItem.currencySymbol}</p>
            </div>
          </div>

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Date</h6>
            <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{selectedItem.date}</p>
          </div>

          <div className='mt-[1rem] flex flex-col gap-4 items-center justify-center'>
            <button onClick={() => setUserTransactionDetailsModal(false)} className='w-full py-3 bg-secondary text-center text-secondary text-[0.8rem] rounded-[9px]'>Exit</button>
          </div>
        </div>


      </div>
    </div>
  )
}
export default Details