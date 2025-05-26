import React from 'react'
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/dropDown.svg";

const FilterDropDownBtn = ({text, className, onClick, isDropDown}) => {
  return (
        <div onClick={onClick} className="categoryFilter_Heading font-semibold text-[20px] flex justify-between items-center cursor-pointer select-none border p-3 rounded-[8px] bg-[#eeeeee] 
                    max-lg:text-[15px]
                    max-md:gap-3
                    max-sm:p-2">
                      <div>
                        {text}
                      </div>
                      <div className="w-[20px]
                      max-lg:w-4">
                        <DropDownIcon className={`${isDropDown? 'rotate-180' : 'rotate-0'} transition-all duration-150`}/>
                      </div>
                    </div>
    
  )
}

export default FilterDropDownBtn
