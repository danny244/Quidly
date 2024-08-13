/* eslint-disable react/prop-types */

function Butons({ text, buttonType, disabled, onClick, id }) {
  return (
    <div className="w-full  flex items-center xl:mt-[2rem] max-xl:mt-[1.5rem]">
      <button
        type={buttonType}
        id={id}
        onClick={onClick}
        disabled={disabled}
        className="mx-auto disabled:transition-colors disabled:duration-500 transform duration-500 transition-colors disabled:bg-secondary disabled:hover:bg-[#8b7a39e5] disabled:cursor-not-allowed bg-secondary rounded-[8px] text-[.75rem] uppercase text-secondary w-full h-[45px] font-medium "
      >
        {text}
      </button>
    </div>
  );
}
export default Butons;
