/* eslint-disable react/prop-types */
import { useContext } from "react"
import { X } from "./svg"
import { AccountDetails } from "../../App"
import { Link } from "react-router-dom"


function ConfirmModal({ confirmModal, handleConfirmButtonFalse, modalRef }) {
  const { userAccountDetails } = useContext(AccountDetails)

  return (
    <div className={`${confirmModal ? ' visible z-[800] opacity-[1] bg-primary duration-500 bg-opacity-30 backdrop-filter backdrop-blur-sm' : 'invisible z-[-10] opacity-0 bg-opacity-0 duration-300 transition-all'} fixed top-0 left-0 w-screen h-screen transition-all duration-500 overflow-hidden flex items-center justify-center`}>
      <div ref={modalRef} className='sm:w-full w-[90%] max-w-[27rem] rounded-[15px] h-fit bg-primary shadow-modal overflow-hidden z-[900]  '>

        <header className='w-full h-[4rem] flex justify-between items-center bg-secondary p-[1rem] '>
          <h5>ConFirm Transaction</h5>
          <img src={X} onClick={() => handleConfirmButtonFalse()} className="w-[1.4rem] cursor-pointer " />
        </header>

        <div className='w-full flex flex-col gap-[2rem] p-[2rem] mt-[0.4rem]'>
          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Account Name</h6>
            <p className='text-secondary capitalize xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{userAccountDetails.acctName}</p>
          </div>

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Account Number</h6>
            <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{userAccountDetails.acctNumber}</p>
          </div>

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Bank Name</h6>
            <p className='text-secondary capitalize xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{userAccountDetails.bankName}</p>
          </div>

          {userAccountDetails.dollars === ""
            ?
            (
              <div className='flex justify-between items-center gap-4 '>
                <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Entered pounds amount</h6>
                <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{userAccountDetails.pounds}£</p>
              </div>
            ) : (
              <div className='flex justify-between items-center gap-4 '>
                <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Entered Dollars amount</h6>
                <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{userAccountDetails.dollars}＄</p>
              </div>
            )
          }

          <div className='flex justify-between items-center gap-4 '>
            <h6 className='text-secondary capitalize xs:text-[0.97555rem] text-[0.8rem] font-bold'>Equivalent in Naira</h6>
            <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 text-right tracking-[2px]'>{userAccountDetails.naira}₦</p>
          </div>

          <div className='mt-[1rem] flex flex-col gap-4 items-center justify-center'>
            <Link to="/account" onClick={() => handleConfirmButtonFalse()} className='w-full py-3 bg-secondary text-center text-secondary text-[0.8rem] rounded-[9px]'>ConFirm</Link>
            <Link to="/" className='w-full text-center py-3 bg-secondary text-secondary text-[0.8rem] rounded-[9px]'>Edit</Link>
          </div>
        </div>


      </div>
    </div>
  )
}
export default ConfirmModal