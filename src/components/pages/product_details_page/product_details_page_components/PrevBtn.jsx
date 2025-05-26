import React from 'react'
import previousIcon from '../../../../assets/icons/suggestPrev.svg';

const PrevBtn = ({onClick, bg_color}) => {
  return (
    <div>
          <button onClick={onClick}
            className={`transition-all duration-200 px-[17.18px] py-[15.5px] bg-[${bg_color}] rounded-[8px] cursor-pointer hover:bg-gray-500
                    max-sm:px-[14px] max-sm:py-3`}
          >
            <img src={previousIcon} alt="" />
          </button>
        </div>
  )
}

export default PrevBtn
