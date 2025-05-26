import React from 'react'
import GotoBtn from './GotoBtn'

const CategoryCard = ({image, category, onClick}) => {
  return (
    <div>
      <div className="swiper-slide catergory w-[50%] px-[48px] py-[30px] rounded-tl-[64px] max-lg:p-7 max-md:p-5 max-sm:p-4">
  {/* Image Container */}
  <div className="catergory_imageContainer w-[80%] mx-auto">
    <img
      className="categoryImage w-full object-contain"
      src={image}
      alt=""
    />
  </div>

  {/* Text and Button Container */}
  <div className="flex justify-between mt-4">
    {/* Category Text */}
    <div className="catergory_text font-semibold text-[36px] uppercase max-xl:text-[30px] max-lg:text-[24px] max-md:text-[22px]">
      {category}
    </div>

    {/* Button Container */}
    <div>
      <GotoBtn onClick={onClick}/>
    </div>
  </div>
</div>
    </div>
  )
}

export default CategoryCard
