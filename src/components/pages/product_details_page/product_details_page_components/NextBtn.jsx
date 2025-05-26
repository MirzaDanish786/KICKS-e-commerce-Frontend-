import React from 'react'
import nextIcon from '../../../../assets/icons/suggestNext.svg';

const NextBtn = ({onClick, bg_color}) => {
  return (
       <div>
          <button onClick={onClick}
                   className={`transition-all duration-200 px-[17.18px] py-[15.5px] bg-[${bg_color}] rounded-[8px] cursor-pointer hover:bg-gray-500
                   max-sm:px-[14px] max-sm:py-3`}
                 >
                   <img src={nextIcon} alt="" />
                 </button>
       </div>
  )
}

export default NextBtn
