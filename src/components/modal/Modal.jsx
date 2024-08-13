/* eslint-disable react/prop-types */
import { X } from "./svg"
import { pounds, dollar } from '../svg'

function Modal({ setCurrency, currency, setOpenModalFalse, modalRef, openModal, poundsRate, dollarRate }) {


  const rates = [
    {
      title: "Dollars",
      symbol: "USD",
      ngnEquivalent: dollarRate,
      image: dollar

    },
    {
      title: "Pounds",
      symbol: "GPB",
      ngnEquivalent: poundsRate,
      image: pounds
    }
  ]

  return (
    <div className={`${openModal ? ' visible z-[800] opacity-[1] bg-primary duration-500 bg-opacity-30 backdrop-filter backdrop-blur-sm' : 'invisible z-[-10] opacity-0 bg-opacity-0 duration-300 transition-all'} fixed top-0 left-0 w-screen h-screen transition-all duration-500 overflow-hidden flex items-center justify-center`}>
      <div ref={modalRef} className='sm:w-full w-[90%] max-w-[27rem] rounded-[15px] h-fit bg-primary shadow-modal overflow-hidden z-[900]  '>
        <header className='w-full h-[4rem] flex justify-between items-center bg-secondary p-[1rem] '>
          <h5>Select Currency</h5>
          <img onClick={() => setOpenModalFalse()} src={X} className="w-[1.4rem] cursor-pointer " />
        </header>
        <div className=' w-full flex flex-col gap-[0.7rem] mt-[0.4rem]'>

          {
            rates.map(({ title, symbol, ngnEquivalent, image }) => {
              return (
                <div onClick={() => setOpenModalFalse() & setCurrency({ ...currency, currency: symbol, rate: ngnEquivalent, equivalent: ngnEquivalent * currency.value, image: image })} key={title} className='flex justify-start items-center px-[1rem] py-[0.6rem] gap-2 cursor-pointer hover:bg-secondary hover:duration-500 duration-500 transition-colors'>
                  <img src={image} className='rounded-full overflow-hidden relative h-[25px] w-[25px] ' />
                  <div className='flex flex-col'>
                    <h6 className='text-[#ffffff] uppercase xs:text-[0.8rem] text-[0.7rem] font-normal'>{symbol}</h6>
                    <p className='text-[#fff9] xs:text-[0.7rem] text-[0.6rem] font-normal'>{title}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Modal