import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef } from "react";
import CategoryCard from "../../../reuseable/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryFirstProducts,
  fetchCategoryNames,
  resetSelectedCategories,
  updateSelectedCategories,
} from "../../../../Redux/features/fetchAPI/fetchSlice";
import NextNavigationBtn from "../../../reuseable/NextNavigationBtn";
import PreviousNavigationBtn from "../../../reuseable/PreviousNavigationBtn";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const dispatch = useDispatch();
  const catData = useSelector((state) => state.fetch_API.categoryData);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategoryNames()).then((result) => {
      if (result.payload) {
        dispatch(fetchCategoryFirstProducts(result.payload));
      }
    });
  }, []);

  const handleGotoBtnClick =(cat)=>{
    dispatch(resetSelectedCategories());
    dispatch(updateSelectedCategories(cat))
    navigate('/listing_page');
    window.scrollTo({top: 0}); 
  }

  return (
    <div>
      <div className="categoriesSection_Wrapper bg-[#232321]
      max-sm:pb-6">
        <div
          className="categoriesSection pt-[90px]
        max-lg:pt-9
        max-md:pt-6"
        >
          <div
            className="catergories_UpperSection flex justify-between items-center w-[92%] mx-[auto] mb-[64px]
            max-lg:mb-9
            max-md:mb-6"
          >
            <div
              className="text-[74px] font-semibold uppercase text-white
            max-xl:text-[55px] 
            max-lg:text-[40px]
            max-sm:text-[35px]
            max-sm:normal-case"
            >
              Categories
            </div>
            <div className="flex gap-[16px]">
              <PreviousNavigationBtn
                onClick={() => swiperRef.current?.slidePrev()}
                bg_color={'#E7E7E3'}
              />
              <NextNavigationBtn
                onClick={() => swiperRef.current?.slideNext()}
                bg_color={'#E7E7E3'}
              />
            </div>
          </div>

          <div
            className="catergories_LowerSection ml-[5%] bg-white rounded-tl-[64px] flex overflow-hidden
          max-sm:flex-col max-sm:h-[800px]"
          >
            <Swiper
              allowTouchMove={false}
              style={{ touchAction: "pan-y" }}
              spaceBetween={50}
              slidesPerView={2}
              direction="vertical"
              breakpoints={{
                640: {
                  direction: "horizontal",
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {catData?.categoryArray?.map((cat, index) => (
                <SwiperSlide key={index}>
                  <CategoryCard
                    image={catData.categoryImagesArray[index]}
                    category={cat}
                    onClick={()=>{handleGotoBtnClick(cat)}}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
