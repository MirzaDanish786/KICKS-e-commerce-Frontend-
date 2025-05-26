import React from 'react';
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
const ReviewsCard = ({ name, review, rating, image }) => {
  return (
    <div className="reviewsSectionCard swiper-slide max-sm:w-[400px]">
     
      <div className="reviewsSectionCard_1_Upper p-[32px] rounded-tl-[32px] rounded-tr-[32px] bg-white max-xl:p-7 max-lg:p-4 max-xl:rounded-tl-3xl max-xl:rounded-tr-3xl max-lg:rounded-tl-2xl max-lg:rounded-tr-2xl h-[170px] max-sm:h-[120px]">
   
        <div className="flex gap-3 justify-between">
          
          <div className="title">
            <div className="font-semibold text-[24px] max-xl:text-xl max-lg:text-lg">{name}</div>
            <div className="text-[16px] font-normal text-[#232321] max-lg:text-sm">{review}</div>
          </div>
    
          <div className="userDp w-[50px] rounded-full">
          <FaUser size={40}/>
          </div>
        </div>

        
        <div className="stars flex gap-1 items-center">
          
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}>
            {index < rating ? <FaStar fill='yellow' /> : <FaStar fill='#d0d0d0'/>}
            </div>
          ))}
         
          <div>{rating}.0</div>
        </div>
      </div>

     
      <div className="reviewSectionCard_1_Lower rounded-br-[32px] rounded-bl-[32px] bg-[#ebeef0] h-[280px] max-sm:h-[220px]">
        
        <img
          className="rounded-br-[32px] rounded-bl-[32px] w-full max-xl:rounded-bl-3xl max-xl:rounded-br-3xl max-lg:rounded-bl-2xl max-lg:rounded-br-2xl h-full object-contain"
          src={image}
          alt="Review"
        />
      </div>
    </div>
  );
};

export default ReviewsCard;