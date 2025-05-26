import React from 'react'

const ProductImage = ({image}) => {
  return (
         <div
          className="productImageSection w-[65%] flex justify-center items-center bg-white rounded-[48px]
          max-lg:rounded-[35px]
          max-md:w-full max-md:rounded-[24px]
          max-sm:rounded-[16px]"
        >
          <div className="productImageContainer w-[60%]">
            <img  className='w-full' src={image} alt="" />
          </div>
        </div>
  )
}

export default ProductImage
