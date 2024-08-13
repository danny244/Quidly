import { LiaHistorySolid } from "react-icons/lia";
import { dashboard } from "./dashBoardContent";
import { useContext, useEffect, useRef, useState } from "react"
import { AccountDetails } from "../../App";
import ConfirmModal from "./ConfirmModal";
import Details from "./Details";


function UserDashboard() {

  const { confirmModal, handleConfirmButtonFalse } = useContext(AccountDetails)
  const modalRef = useRef(null);
  const userTransactionDetailsModalRef = useRef(null);
  const [userTransactionDetailsModal, setUserTransactionDetailsModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')




  const header = [

    {
      header: "TOTAL TRADES",
      number: 0,
      id: 1,
    },

    {
      header: "COMPLETION RATE",
      number: 0,
      id: 2,
    },

    {
      header: "TOTAL TRADES",
      number: 0,
      id: 3,
    },

    {
      header: "TOTAL TRADES",
      number: 0,
      id: 4,
    }

  ]

  // console.log(selectedItem)

  const setUserTransactionDetailsModalTrue = (item) => {
    setUserTransactionDetailsModal(true)
    setSelectedItem(item)
  }


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleConfirmButtonFalse();
      }
    };

    const handleUserTransactionDetailsModalOutsideClick = (event) => {
      if (userTransactionDetailsModalRef.current && !userTransactionDetailsModalRef.current.contains(event.target)) {
        setUserTransactionDetailsModal(false)
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('mousedown', handleUserTransactionDetailsModalOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('mousedown', handleUserTransactionDetailsModalOutsideClick);
    };
  }, []);


  useEffect(() => {
    if (confirmModal || userTransactionDetailsModal) {
      document.body.classList.add('overflow-hidden');
    }

    else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [confirmModal, userTransactionDetailsModal]);




  return (
    <>
      <Details userTransactionDetailsModalRef={userTransactionDetailsModalRef} selectedItem={selectedItem} userTransactionDetailsModal={userTransactionDetailsModal} setUserTransactionDetailsModal={setUserTransactionDetailsModal} />
      <ConfirmModal confirmModal={confirmModal} modalRef={modalRef} handleConfirmButtonFalse={handleConfirmButtonFalse} />

      <div className='w-full h-fit flex flex-col justify-center'>

        <div className='w-full h-fit mb-20 xl:grid xl:justify-items-center gap-6 xl:grid-cols-4 flex flex-wrap justify-center items-center'>

          {
            header.map(({ header, number, id }) => (
              <div key={id} className='dashboard'>
                <h6>{header}</h6>
                <p>{number}</p>
              </div>
            ))
          }

        </div>

        <div className='w-full h-fit bg-tertiary rounded-[10px] border-[#313946] overflow-hidden border-2 flex flex-col justify-center'>

          <div className='w-full h-[2.7rem] bg-[#12161D] flex justify-center items-center border-[#313946] border-b-2'>
            <div className='w-fit flex items-center gap-2 uppercase tracking-[1.6px] text-[#C6C6C6] font-medium text-[0.7rem]'>
              <LiaHistorySolid className='text-tertiary text-[1.3rem] font-medium' />
              <p>TRANSACTION HISTORY</p>
            </div>
          </div>

          <div className='table-div'>
            <table className='border-collapse w-full max-lg:min-w-[52rem] text-left'>

              <thead>
                <tr className='text-[0.7rem] border-b-2 border-[#313946] text-left font-medium text-tertiary uppercase bg-tertiary tracking-[1.6px] '>
                  <th className='py-3 w-[40%] pl-6 pr-2'>MERCHANT</th>
                  <th className='py-3 w-[15%] px-2'>EXCHANGE</th>
                  <th className='py-3 w-[15%] px-2'>NAIRA</th>
                  <th className='py-3 w-[15%] px-2'>CURRENCY</th>
                  <th className='py-3 w-[15%] pr-6 pl-2'>DATE</th>
                </tr>
              </thead>

              <tbody className='bg-[#141922] font-normal text-left'>

                {
                  dashboard.map((item, index) => (
                    <tr key={index} onClick={() => setUserTransactionDetailsModalTrue(item)} className='first-tr '>
                      <td className=''>
                        <div className='flex flex-col font-normal items-start cursor-pointer'>
                          <div className='flex gap-1'>
                            <p className='text-[#E2AC1A] text-[0.9rem]'>{item.userName}</p>
                            <img src={item.image} className='w-[0.8rem]' />
                          </div>
                          <p className='text-[0.7rem] text-tertiary'>{item.completion}</p>
                        </div>
                      </td>
                      {/*  */}
                      <td className='text-tertiary font-normal text-[0.8rem] '>
                        <span className='font-medium text-[#ffffff] cursor-pointer'>{item.exchange}  {item.exchangeSymbol}</span>

                      </td>
                      <td className='text-tertiary font-normal text-[0.8rem] '>
                        <span className='font-medium text-[#ffffff] cursor-pointer'>{item.naira} NGN</span>
                      </td>
                      <td className='text-tertiary flex gap-1 justify-start items-center text-left text-[0.8rem] text-[#ffffff]'>
                        <img src={item.currencyImage} className='rounded-full cursor-pointer mt-2 overflow-hidden relative xs:h-[25px] xs:w-[25px] w-[20px] h-[20px] ' />
                        <p className='mt-[0.4rem] cursor-pointer'>{item.currencySymbol}</p>
                      </td>
                      <td className='text-tertiary text-[0.8rem] tracking-widest '>
                        <p className='cursor-pointer'>{item.date}</p>
                      </td>
                    </tr>

                  ))
                }

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserDashboard