import React from 'react'
import CardButton from './CardButton'

const Card = ({ image, title, price, onClick }) => {
  return (
    <div>
      <div className="newDrops_Card1 flex flex-col gap-[16px] justify-between">
        {/* Image container with fixed height */}
        <div className="p-[8px] bg-white rounded-[24px] max-md:rounded-2xl">
          <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[16px] bg-gray-100">
            <img
              src={image}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* Title */}
        <div
          className="newDropsTitle font-semibold text-[24px] flex-grow text-ellipsis whitespace-nowrap overflow-hidden
          max-lg:text-[20px] max-sm:text-[18px]"
        >
          {title}
        </div>

        {/* Price + Button */}
        <div>
          <CardButton onClick={onClick} price={price} />
        </div>
      </div>
    </div>
  );
};


export default Card
