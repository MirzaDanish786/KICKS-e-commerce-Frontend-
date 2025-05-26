import React from 'react'

const CardButton = ({price, onClick}) => {
  return (
    <div>
         <button onClick={onClick}
                className="transition-all text-nowrap duration-200 productDetailBtn bg-[#232321] px-[24px] justify-center w-full py-[15.5px] flex gap-1 rounded-[8px] cursor-pointer hover:bg-black
                max-lg:px-4 max-lg:py-3
                max-sm:px-3 max-sm:py-2"
              >
                <div className="text-[#FFFFFF]
                max-lg:text-[12px]">View Product</div>
                <div className="text-[#FFFFFF]">-</div>
                <div className="newDropsPrice text-[#FFA52F]
                max-lg:text-sm">${price}</div>
              </button>
    </div>
  )
}

export default CardButton
