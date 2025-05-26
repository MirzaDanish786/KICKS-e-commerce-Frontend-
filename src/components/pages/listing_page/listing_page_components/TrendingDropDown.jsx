import React from "react";
import { useRef } from "react";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/dropDown.svg";
import { useDispatch } from "react-redux";
import { setRating } from "../../../../Redux/features/fetchAPI/fetchSlice";
const TrendingDropDown = ({ isDropDown, onClick, className, dropDownTrendingRef }) => {
  const trendBtnTextRef = useRef(null);
  const dispatch = useDispatch();
  const handleTrendOptionClick=(e)=>{
    trendBtnTextRef.current.innerText = e.currentTarget.dataset.trend;
    dispatch(setRating(e.target.value));
  }
  
  return (
    <div ref={dropDownTrendingRef} className="w-full relative">
      <button
        onClick={onClick}
        className={`${className} trendingBtn w-full font-semibold text-[16px] bg-white flex gap-[50px] justify-between text-nowrap items-center px-[16px] py-[18px] rounded-[16px] cursor-pointer
                    max-lg:gap-4
                    max-sm:p-3 max-sm:rounded-lg
                    max-[425px]:gap-3`}
      >
        <div
        ref={trendBtnTextRef}
          className="trendingBtnText
                        max-lg:text-[15px]"
        >
          Trending Options
        </div>
        <div>
          <DropDownIcon className={`${isDropDown? 'rotate-180' : 'rotate-0'} transition-all duration-150`}/>
        </div>
      </button>

      <div className={`${isDropDown? 'block' : 'hidden'} trendingDropDown overflow-hidden w-full absolute rounded-[8px] bg-[#eeeeee] border z-30 `}>
        <ul className="flex flex-col justify-center w-full ">
          <li value={4} data-trend = "✨Most Trending" className="mostTrending  px-3 py-1 cursor-pointer hover:bg-white " onClick={handleTrendOptionClick}>
            ✨Most Trending
          </li>
          <div className="divider h-[1px] border-gray-300 w-full border"></div>
          <li value={2} data-trend = "🔥Hot Products" className="hotProducts  px-3 py-1 cursor-pointer hover:bg-white " onClick={handleTrendOptionClick}>
            🔥Hot Products
          </li>
          <div className="divider h-[1px] border-gray-300 w-full border"></div>
          <li value={0} data-trend = "Trending Options" className="noneOfAbove  px-5 py-1 cursor-pointer hover:bg-white " onClick={handleTrendOptionClick}>
            None of above
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrendingDropDown;
