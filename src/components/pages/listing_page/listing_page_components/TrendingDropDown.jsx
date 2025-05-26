import React from "react";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/dropDown.svg";
const TrendingDropDown = ({ isDropDown, onClick, className }) => {
  return (
    <div className="w-full relative">
      <button
        onClick={onClick}
        className={`${className} trendingBtn w-full font-semibold text-[16px] bg-white flex gap-[50px] justify-between text-nowrap items-center px-[16px] py-[18px] rounded-[16px] cursor-pointer
                    max-lg:gap-4
                    max-sm:p-3 max-sm:rounded-lg
                    max-[425px]:gap-3`}
      >
        <div
          className="trendingBtnText
                        max-lg:text-[15px]"
        >
          Trending Options
        </div>
        <div>
          <DropDownIcon className={`${isDropDown? 'rotate-180' : 'rotate-0'} transition-all duration-150`}/>
        </div>
      </button>

      <div className={`${isDropDown? 'block' : 'hidden'} trendingDropDown w-full absolute rounded-[8px] bg-[#eeeeee] py-[10px] border z-30 `}>
        <ul className="flex flex-col justify-center gap-[5px] w-full">
          <li className="mostTrending px-[10px] cursor-pointer">
            ✨Most Trending
          </li>
          <div className="divider h-[1px] w-full border"></div>
          <li className="hotProducts px-[10px] cursor-pointer">
            🔥Hot Products
          </li>
          <div className="divider h-[1px] w-full border"></div>
          <li className="noneOfAbove px-[17px] cursor-pointer">
            None of above
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrendingDropDown;
