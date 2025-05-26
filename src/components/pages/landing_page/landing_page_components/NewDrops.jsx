import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../reuseable/Button";
import Card from "../../../reuseable/Card";
import { useNavigate } from "react-router-dom";

const NewDrops = () => {
  const data = useSelector((state) => state.fetch_API.newDropData);
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate("/listing_page");
  };

  const handleCardBtnClick = (product) => {
    navigate("/product_details", { state: product }); // Pass the full product object
  };

  // Check if data is valid
  if (!data || data.length === 0) {
    return (
      <div className="newDrops w-[92%] mx-auto my-[90px] flex flex-col items-center">
        <h2 className="text-[24px] font-semibold text-gray-500">
          No new drops available.
        </h2>
      </div>
    );
  }

  return (
    <div className="newDrops w-[92%] mx-auto my-[90px] flex flex-col gap-[32px]">
      <div className="newDrops_Upper flex justify-between items-end">
        <div
          className="text-[74px] uppercase font-semibold w-[50%] leading-[95%]
          max-xl:text-[55px] 
          max-lg:text-[40px]
          max-md:w-[70%]
          max-sm:text-[30px]
          max-sm:normal-case"
        >
          Don't miss out new drops
        </div>
        <div>
          <Button text={"See All"} onClick={handleSeeMoreClick} />
        </div>
      </div>

      <div
        className="newDrops_Grid grid grid-cols-4 gap-[16px]
          max-lg:gap-2
         max-md:grid-cols-2"
      >
        {data.map((product, index) => (
          <Card
            key={product.id || index} // Use `id` if available, fallback to `index`
            image={product.thumbnail}
            title={product.title}
            price={product.price}
            onClick={() => handleCardBtnClick(product)} // Pass the full product object
          />
        ))}
      </div>
    </div>
  );
};

export default NewDrops;