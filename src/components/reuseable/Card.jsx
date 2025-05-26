import React from 'react'
import CardButton from './CardButton'

const Card = ({image, title, price, onClick}) => {
  return (
    <div>
        <div className="newDrops_Card1 flex flex-col gap-[16px] justify-between">
            <div className="p-[8px] bg-white rounded-[24px] max-md:rounded-2xl  ">
              <img className="newDropsCard_img object-contain w-full h-full" src={image} alt="" />
            </div>
            
            <div className="newDropsTitle font-semibold text-[24px] flex-grow text-ellipsis whitespace-nowrap overflow-hidden
            max-lg:text-[20px] max-sm:text-[18px]">
              {title}
            </div>
            <div>
           <CardButton onClick={onClick} price={price}/>
            </div>
           
          </div>
    </div>
  )
}

export default Card
