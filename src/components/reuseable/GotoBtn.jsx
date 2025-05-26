import React from 'react'
import gotoBtn from '../../assets/icons/gotoBtn.svg'
const GotoBtn = ({onClick}) => {
  return (
    <div>
         <button
        className="bg-[#232321] p-[12px] rounded-[8px] cursor-pointer max-lg:p-2 max-sm:w-6"
        onClick={onClick}
      >
        <img
          className="w-full object-contain"
          src={gotoBtn}
          alt=""
        />
      </button>
    </div>
  )
}

export default GotoBtn
