import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PICK_RANDOM_IMAGE } from "../../../../Redux/features/fetchAPI/fetchSlice";
import Button from "../../../reuseable/Button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const heroSectionData = useSelector(
    (state) => state.fetch_API.heroSectionData
  );
  const heroSectionProducts = useSelector(
    (state) => state.fetch_API.heroSectionProducts
  );
  const [heroCurrentImage, setHeroCurrentImage] = useState([]);
  const randomIndex = useSelector(state=> state.fetch_API.randomIndex)

  useEffect(() => {
    if (heroSectionProducts.length > 0) {
      dispatch(PICK_RANDOM_IMAGE());
    }
  }, [heroSectionProducts, dispatch]);

  useEffect(() => {
    if (heroSectionData.heroSectionProductImages) {
      setHeroCurrentImage([...heroSectionData.heroSectionProductImages]);
      // console.log("Data",heroSectionProducts[randomIndex])
    }
  }, [heroSectionData]);

  const swapImages = (swapIndex) => {
    let updatedImages = [...heroCurrentImage];
    [updatedImages[0], updatedImages[swapIndex]] = [
      updatedImages[swapIndex],
      updatedImages[0],
    ];
    setHeroCurrentImage(updatedImages);
  };
  const handleShopNowClick = ()=>{
    navigate('/product_details',{state: heroSectionProducts[randomIndex]});
  }

  return (
    <>
      <div className="w-[92%] mx-auto">
        <div
          className="select-none font-bold flex justify-between gap-4 px-4
             text-[clamp(2rem,15vw,14rem)] w-fit mx-auto
             max-sm:gap-2"
        >
          <div className="text-[#232321]">DO</div>
          <div className="text-[#232321]">IT</div>
          <div className="text-[#4A69E2]">RIGHT</div>
        </div>

        <div
          style={{ backgroundImage: `url(${heroCurrentImage[0]})` }}
          className="heroMainSection  bg-[#ebeef0] bg-center bg-contain bg-no-repeat h-[750px] flex justify-start items-end p-[48px] rounded-[64px] relative 
          max-lg:p-[30px] max-lg:rounded-[55px]
          max-md:p-[20px] max-md:rounded-[24px] max-md:h-[450px]
          max-[460px]:!h-[382px]"
        >
          <div className="heroSection_Content pl-4 w-[60%] max-sm:pl-0">
            <div
              className="heroSectionTitle text-[74px] font-semibold text-white leading-none line-clamp-2
              max-lg:text-[60px]
              max-md:text-[48px]
              max-sm:text-[40px]
              max-[460px]:font-medium max-[460px]:!text-[30px] max-[460px]:line-clamp-2
            "
            >
              {heroSectionData.heroSectionTitle}
            </div>
            <div
              className="heroSectionDescription line-clamp-2 font-normal text-[24px] text-white w-[410px] mb-[24px]
             max-lg:text-[20px]
             max-md:text-[17px]
             max-sm:w-full max-sm:mb-1
             max-[460px]:!text-[14px]"
            >
              {heroSectionData.heroSectionDesc}
            </div>
            <div>
              <Button onClick={handleShopNowClick} text={"Shop now"}/>
            </div>
          </div>

          <div
            className="changeImageContainer flex flex-col gap-[16px] absolute right-[32px] bottom-[32px]
            max-md:right-4 max-md:bottom-4"
          >
            {/* Image_2 */}
            <div
              id="hero_image_2"
              style={{ backgroundImage: `url(${heroCurrentImage[1]})` }}
              onClick={() => {
                swapImages(1);
              }}
              className="hero_image_2 hover:bg-[length:120%] bg-[#ebeef0]  transition-[background-size] duration-300 ease-in-out w-[160px] h-[160px] border-3 border-[#E7E7E3] rounded-[32px] bg-center bg-no-repeat cursor-pointer 
              max-md:w-30 max-md:h-30 max-md:rounded-[25px]
              max-sm:w-26 max-sm:h-26 max-sm:rounded-[18px]
              max-[500px]:!w-[64px] max-[500px]:!h-[64px] max-[500px]:!rounded-lg max-[500px]:border-1"
            ></div>
            {/* Image_3 */}
            <div
              id="hero_image_3"
              style={{ backgroundImage: `url(${heroCurrentImage[2]})` }}
              onClick={() => {
                swapImages(2);
              }}
              className="hero_image_3 w-[160px] h-[160px] border-3 bg-[#ebeef0]  transition-[background-size] duration-300 ease-in-out border-[#E7E7E3] rounded-[32px]  bg-center  bg-no-repeat cursor-pointer
              max-md:w-30 max-md:h-30 max-md:rounded-[25px]
              max-sm:w-26 max-sm:h-26 max-sm:rounded-[18px]
              max-[500px]:!w-[64px] max-[500px]:!h-[64px] max-[500px]:!rounded-lg max-[500px]:border-1"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
