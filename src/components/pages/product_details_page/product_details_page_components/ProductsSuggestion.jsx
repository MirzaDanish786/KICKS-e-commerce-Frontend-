import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../../reuseable/Card";
import PreviousNavigationBtn from "../../../reuseable/PreviousNavigationBtn";
import NextNavigationBtn from "../../../reuseable/NextNavigationBtn";
import NextBtn from "./NextBtn";
import PrevBtn from "./PrevBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import React from 'react';

const ProductsSuggestion = ({ category, proData }) => {
  const swiperRef_suggested = useRef(null);
  const allProducts = useSelector((state) => state.fetch_API.products);
  const [suggestClick, setSuggestClick] = useState(null);
  const navigate = useNavigate();
  const suggestedProducts = allProducts.filter(
    (product) => product.category === category && product.id !== proData.id
  );
  console.log(suggestedProducts)
  const handleBtnClick =(product)=>{
    navigate("/product_details",{state: product})
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div
      className="suggestionSection w-[92%] mx-auto mt-[128px] flex flex-col gap-[32px]
        max-md:mt-12"
    >
      <div className="suggestUpper flex justify-between items-center">
        <div
          className="font-semibold text-[48px]
          max-lg:text-[38px]
          max-md:text-[35px] "
        >
          You may also like
        </div>
        <div
          className="flex gap-[16px]
          max-md:gap-2"
        >
          <PrevBtn
            onClick={() => swiperRef_suggested.current?.slidePrev()}
            bg_color={"#232321"}
          />
          <NextBtn
            onClick={() => swiperRef_suggested.current?.slideNext()}
            bg_color={"#232321"}
          />
        </div>
      </div>

      {/* <!-- Swiper Container --> */}

      <div className="w-full mx-auto">
        <Swiper
          spaceBetween={16}
          slidesPerView={2} 
          breakpoints={{
            768: {
              slidesPerView: 4, 
              spaceBetween: 16,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => (swiperRef_suggested.current = swiper)}
        >
          {suggestedProducts.map((cat, index) => (
            <SwiperSlide key={index}>
              <Card
                image={cat.thumbnail}
                title={cat.title}
                price={cat.price}
                onClick={()=>{handleBtnClick(cat)}}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSuggestion;
