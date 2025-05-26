import React from 'react'
import { ReactComponent as FilterIcon } from "../../../../assets/icons/filter.svg";

const FilterBtn = ({onClick, className}) => {
  return (
    <div className='w-full'>
       <button
        onClick={onClick}
        className={`trendingBtn w-full ${className} font-semibold text-[16px] bg-white flex gap-[50px] justify-between items-center px-[16px] py-[18px] rounded-[16px] cursor-pointer
                    max-lg:gap-4
                    max-sm:p-3 max-sm:rounded-lg
                    max-[425px]:gap-3 `}
      >
        <div
          className="trendingBtnText
                        max-lg:text-[15px]"
        >
            Filters
        </div>
        <div>
          <FilterIcon/>
        </div>
      </button>

    </div>
  )
}

export default FilterBtn
