import React from "react";
import previousIcon from '../../assets/icons/previousBtn.svg';
const PreviousNavigationBtn = ({ onClick, bg_color }) => {
  const bgClass = bg_color === '#E7E7E3' ? 'bg-[#E7E7E3]' : 'bg-default-color'; // Add more conditions as needed

  return (
    <div>
      <button
        onClick={onClick}
        className={`transition-all duration-200 px-[17.18px] py-[15.5px] ${bgClass} rounded-[8px] cursor-pointer hover:bg-gray-500
                max-sm:px-[14px] max-sm:py-3`}
      >
        <img src={previousIcon} alt="" />
      </button>
    </div>
  );
};

export default PreviousNavigationBtn;
