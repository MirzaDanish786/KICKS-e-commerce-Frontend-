import React from 'react'
import { ReactComponent as HeartIcon } from "../../../../assets/icons/heart.svg";

const ProductDescription = ({title, price, desc, stock, warranty, shipping}) => {
  return (
      <div className="productDetails w-[35%]
        max-md:w-full">
          <div className="flex flex-col gap-[16px] mb-[32px]
          max-lg:mb-6 max-lg:gap-0">
            <div>
              <button
                className="font-medium text-[14px] text-white bg-[#4A69E2] py-[12px] px-[16px] rounded-[12px] cursor-pointer"
              >
                New Release
              </button>
            </div>
            <div className="productTtle font-semibold text-[32px]">{title}</div>
            <div className="price text-[#4A69E2] font-semibold text-[24px]">${price}</div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between gap-[8px]">
              <div className="flex w-full">
                <button
                  className="w-full bg-[#232321] flex justify-center items-center py-[15.5px] rounded-[8px] text-white cursor-pointer"
                >
                  ADD TO CART
                </button>
              </div>
              <div>
                <button
                  className="bg-[#232321] py-[15.5px] flex justify-center items-center rounded-[8px] p-[18.5px] cursor-pointer"
                >
                  <div className="flex justify-center items-center">
                   <HeartIcon/>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <div className="flex w-full ">
                <button
                  className="bg-[#4A69E2] w-full flex justify-center items-center py-[15.5px] rounded-[8px] text-white cursor-pointerfs"
                >
                  BUY IT NOW
                </button>
              </div>
            </div>
          </div>

          <div className="aboutProduct mt-[30px]">
            <div className="flex flex-col gap-[4px]">
              <div className="uppercase text-[16px] font-semibold">
                About the Product
              </div>
              <div className="description opacity-[80%]">{desc}</div>
            </div>
            <div className="stock"><b>Stock:</b>{ stock}</div>
            <div className="warranty"><b>Warranty:</b>{warranty}</div>
            <div className="shipping"><b>Shipping:</b>{shipping}</div>
          </div>
        </div>
  )
}

export default ProductDescription
