import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react'
import ExitModal from './ExitModal';

function CopyAccountDetails() {

  const accounts = [
    {
      bankName: "Access Bank",
      acctName: "John Doe",
      acctNum: 6797543695,
      id: 1,
    },

    {
      bankName: "Unity Bank",
      acctName: "Robert Joseph",
      acctNum: 3927469742,
      id: 2,
    },

    {
      bankName: "Polaris Bank",
      acctName: "Thomas Michael",
      acctNum: 1038643975,
      id: 3,
    },

    {
      bankName: "Paga",
      acctName: "James William",
      acctNum: 1084286482,
      id: 4,
    },

  ]

  const notify = () => toast("Copied to clipboard");
  const ExitModalRef = useRef(null);
  const [openExitModal, setOpenExitModal] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ExitModalRef.current && !ExitModalRef.current.contains(event.target)) {
        setOpenExitModal(false)
      }
    };


    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  useEffect(() => {
    if (openExitModal) {
      document.body.classList.add('overflow-hidden');
    }

    else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [openExitModal]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <ExitModal openExitModal={openExitModal} ExitModalRef={ExitModalRef} setOpenExitModal={setOpenExitModal} />

      <div className='my-[5rem] md:h-full  h-fit w-full flex flex-col justify-center'>

        <header className='w-full h-fit flex justify-center text-center'>
          <h2 className='font-bold text-[2rem] max-w-[30rem] text-secondary w-full text-center capitalize leading-[120%]'>Transfer your dollar/pounds into one of this accounts</h2>
        </header>


        <div className='w-full h-fit flex flex-wrap gap-6 items-center mt-[3rem] justify-center'>

          {
            accounts.map(({ bankName, acctName, acctNum, id }) => (
              <div key={id} className='bg-tertiary border-[#313946] border-2 flex flex-col justify-center items-center p-[1.1rem] gap-3 shadow-shadow-color  h-[14rem] max-w-[17rem] w-full rounded-[15px] '>
                <div className='flex w-full justify-between items-center gap-4 '>
                  <h6 className='text-secondary capitalize xs:text-[0.8786rem] text-[0.8rem] font-bold'>Bank name:</h6>
                  <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 tracking-[2px]'>{bankName}</p>
                </div>
                <div className='flex w-full justify-between items-center gap-4 '>
                  <h6 className='text-secondary capitalize xs:text-[0.8786rem] text-[0.8rem] font-bold'>Acct Name:</h6>
                  <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 tracking-[2px]'>{acctName}</p>
                </div>
                <div className='flex w-full justify-between items-center gap-4 '>
                  <h6 className='text-secondary capitalize xs:text-[0.8786rem] text-[0.8rem] font-bold'>Acct Num:</h6>
                  <p className='text-secondary xs:text-[0.8rem] text-[0.7rem] font-extrabold contrast-200 tracking-[2px]'>{acctNum}</p>
                </div>
                <div className='w-full  flex items-center xl:mt-[2rem] max-xl:mt-[1.5rem]'>
                  <button
                    className='bg-secondary rounded-[8px] text-[0.7rem] uppercase text-secondary w-full h-[45px] font-medium'
                    onClick={() => {
                      const account = `${bankName}\n${acctName}\n${acctNum}`;
                      navigator.clipboard.writeText(account);
                      notify()
                      setTimeout(() => {
                        setOpenExitModal(true)
                      }, 3000);
                    }}
                  >
                    CoPy to clipboard
                  </button>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>
  )
}
export default CopyAccountDetails