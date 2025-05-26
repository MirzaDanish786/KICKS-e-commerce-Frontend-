import React from "react";

const Button = ({ text, color = '#4A69E2', onClick }) => {
  return (
    <div>
      <button onClick={onClick}
        className={`transition-all duration-500 font-medium text-[14px] text-white bg-[${color}] py-[15.5px] px-[32px] rounded-[8px] cursor-pointer hover:bg-black
                max-md:px-7 max-md:py-3 max-md:text-[12px]`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
