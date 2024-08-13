/* eslint-disable react/prop-types */
import { bankImg } from "./image";
import { useState, useEffect } from "react";
import { X } from "./svg";
import { TbSearch } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function BankModal({
  bank,
  loading,
  handleBankClick,
  setBankOpenModalToFalse,
  bankModalRef,
  openBankModal,
}) {
  const [search, setSearch] = useState("");
  const filteredOptions = bank.filter((option) => {
    return search.toLowerCase() === ""
      ? option
      : option.name.toLowerCase().includes(search.toLowerCase());
    // option.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  useEffect(() => {
    const handleKeyPress = () => {
      document.getElementById("search").focus();
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={`${
        openBankModal
          ? " visible z-[800] opacity-[1] bg-primary duration-500 bg-opacity-30 backdrop-filter backdrop-blur-sm"
          : "invisible z-[-10] opacity-0 bg-opacity-0 duration-300 transition-all"
      } fixed top-0 left-0 w-screen h-screen transition-all duration-500 overflow-hidden flex items-center justify-center`}
    >
      <div
        ref={bankModalRef}
        className="sm:w-full w-[90%] lg:max-w-[27rem] max-w-[29rem] rounded-[15px] h-fit bg-primary shadow-modal overflow-hidden z-[900]  "
      >
        <header className="w-full h-[4rem] flex justify-between items-center bg-secondary p-[1rem] ">
          <h5>Select Bank</h5>
          <img
            onClick={setBankOpenModalToFalse}
            src={X}
            className="w-[1.4rem] cursor-pointer "
          />
        </header>

        <div className="w-full flex items-center relative mt-[0.8rem]">
          <input
            placeholder="Select bank"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-[97%] sm:placeholder:text-[0.9rem] placeholder:text-[0.7rem] h-[2.3rem] sm:text-[0.9rem] text-[0.7rem] border-2 rounded-[10px] px-[0.9rem] pr-[1.9rem] border-primary mx-[2%]  text-secondary bg-[#151a22] outline-none "
          />
          <div className="absolute right-[4%] text-primary text-[1.2rem] cursor-pointer">
            <TbSearch />
          </div>
        </div>

        <div className=" w-full flex flex-col 2xl:h-[50vh] lg:h-[70vh] h-[60vh] gap-[0.7rem] bankModal overflow-y-auto mt-[0.8rem]">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center ">
              <AiOutlineLoading3Quarters className="animate-spin text-secondary w-[1.3rem] h-[1.3rem] font-bold" />
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  setBankOpenModalToFalse();
                  handleBankClick(option);
                }}
                className="flex justify-between items-center px-[1.2rem] py-[0.6rem] gap-2 cursor-pointer hover:bg-secondary hover:duration-500 duration-500 transition-colors"
              >
                <p className="text-secondary xs:text-[0.9rem] text-[0.6rem] font-normal">
                  {option.name}
                </p>
                <img src={bankImg} width={30} alt="bank" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default BankModal;
