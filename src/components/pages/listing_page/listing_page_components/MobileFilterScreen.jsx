import React, { useState, useEffect } from "react";
import FilterDropDownBtn from "./FilterDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryNames,
  resetSelectedCategories,
  updateSelectedCategories,
  setRating,
  ToogleFilterValue,
} from "../../../../Redux/features/fetchAPI/fetchSlice";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancel.svg";

const MobileFilterScreen = () => {
  const [isCategory, setIsCategory] = useState(true);
  const [isRating, setIsRating] = useState(false);

  const isFilterLayout = useSelector((state) => state.fetch_API.isFilterLayout);
  const categories = useSelector(
    (state) => state.fetch_API.categoryData.categoryArray
  );
  const selectedCategories = useSelector(
    (state) => state.fetch_API.selectedCategories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryNames());
  }, [dispatch]);

  const handleDropDownCategory = () => {
    setIsCategory((prev) => !prev);
  };

  const handleDropDownRating = () => {
    setIsRating((prev) => !prev);
  };

  const handleCloseFilterClick = () => {
    dispatch(ToogleFilterValue());
  };

  const handleSeeAllSelected = () => {
    dispatch(resetSelectedCategories());
  };

  const handleUpdateCategory = (category) => {
    dispatch(updateSelectedCategories(category));
  };

  const handleRatingClick = (e) => {
    dispatch(setRating(e.target.value));
  };

  const handleApplyFilters = () => {
    dispatch(ToogleFilterValue());
  };

  return (
    <div className={`md:hidden ${isFilterLayout ? "block" : "hidden"}`}>
      <div className="flex flex-col w-[100vw] fixed h-[100vh] gap-4 bg-[#eeeeee] z-100 top-0 left-0">
        {/* Heading */}
        <div className="bg-white p-4 font-semibold text-xl flex items-center justify-between">
          <div>Filters:</div>
          <div onClick={handleCloseFilterClick}>
            <CancelIcon />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4">
          <FilterDropDownBtn
            text={"Category Filter"}
            className="justify-between"
            onClick={handleDropDownCategory}
            isDropDown={isCategory}
          />
          <div
            className={`${
              isCategory ? "block" : "hidden"
            } categoryListContainer w-full h-[150px] overflow-y-auto bg-[#eeeeee] rounded-[8px] px-[10px] py-[10px] custom-scrollbar border max-sm:p-1`}
          >
            {/* "See All" Option */}
            <div className="flex items-center font-medium gap-2 w-full max-xl:text-sm max-xl:font-semibold">
              <input
                id="seeAll"
                type="checkbox"
                onChange={handleSeeAllSelected}
                checked={selectedCategories.length === 0}
              />
              <label
                className="w-full text-nowrap text-ellipsis overflow-hidden block uppercase cursor-pointer"
                htmlFor="seeAll"
              >
                See all
              </label>
            </div>

            {/* Dynamic Category List */}
            {categories.length > 0
              ? categories.map((cat, index) => (
                  <div
                    key={index}
                    className="flex items-center font-medium gap-2 w-full max-xl:text-sm max-xl:font-semibold"
                  >
                    <input
                      id={cat}
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleUpdateCategory(cat)}
                    />
                    <label
                      className="w-full text-nowrap text-ellipsis overflow-hidden block uppercase cursor-pointer"
                      htmlFor={cat}
                    >
                      {cat}
                    </label>
                  </div>
                ))
              : console.log("category is empty")}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="p-4">
          <FilterDropDownBtn
            text={"Filter by rating"}
            onClick={handleDropDownRating}
            isDropDown={isRating}
          /> 
          <div
            className={`${
              isRating ? "block" : "hidden"
            } ratingList text-[20px] bg-[#eeeeee] rounded-[8px] px-[10px] py-[10px] border max-sm:p-2 max-md:w-full`}
          >
            {[
              { value: 4, label: "4⭐ & above" },
              { value: 3, label: "3⭐ & above" },
              { value: 2, label: "2⭐ & above" },
              { value: 1, label: "1⭐ & above" },
              { value: 0, label: "None of the above", checked: true },
            ].map(({ value, label, checked= false }) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer max-md:text-[16px] max-md:font-semibold py-1"
              > 
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  defaultChecked={checked}
                  onChange={handleRatingClick}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="p-4">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#232321] text-white p-3 rounded-lg font-bold hover:bg-black"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterScreen;