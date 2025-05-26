  import FilterDropDownBtn from "./FilterDropDown";
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchCategoryNames, resetSelectedCategories, setRating, ToogleFilterValue, updateSelectedCategories } from "../../../../Redux/features/fetchAPI/fetchSlice";
  import FilterBtn from "./FilterBtn";
  import MobileFilterScreen from "./MobileFilterScreen";
import TrendingDropDown from "./TrendingDropDown";

  const Filter = () => {
    const [isCategory, setIsCategory] = useState(true);
    const [isRating, setIsRating] = useState(false);
    const [isTrending, setIsTrending] = useState(false)
    const [isSellAllSelected, setIsSellAllSelected] = useState(false);
    

    const isFilterLayout  = useSelector((state)=> state.fetch_API.isFilterLayout);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.fetch_API.categoryData.categoryArray);
    const selectedCategories = useSelector(state => state.fetch_API.selectedCategories);

    useEffect(() => {
      dispatch(fetchCategoryNames());
    }, [dispatch]);

    useEffect(() => {
      if(selectedCategories.length === 0){
        setIsSellAllSelected(true)
      }
      else{
        setIsSellAllSelected(false)
      }
    }, [selectedCategories]);
    

    const handleDropDownCategory = () => {
      if (isCategory) {
        setIsCategory(false);
      } else {
        setIsCategory(true);
      }
    };
    const handleDropDownRating = () => {
      if (isRating) {
        setIsRating(false);
      } 
      else {
        setIsRating(true);
      }
    };
    const handleOpenFilterClick = ()=>{
      dispatch(ToogleFilterValue());
    }
    const handleTrendingDropDownClick = ()=>{
    if(isTrending){
      setIsTrending(false);
    }
    else{
      setIsTrending(true);
    }
  }

  const handleSeeAllSelected = (e)=>{
    setIsSellAllSelected(true)
    dispatch(resetSelectedCategories());
  }

  const handleUpdateCategory =(category)=>{
    dispatch(updateSelectedCategories(category));
    setIsSellAllSelected(false);
    }
  const handleRatingClick = (e) => {
    dispatch(setRating(e.target.value));
  }
  
    return (
      <div className="w-full">
        <div className="w-full flex gap-5">
          {isFilterLayout && <MobileFilterScreen/>}
          <FilterBtn className={'md:hidden'} onClick={handleOpenFilterClick}/>
          <TrendingDropDown className={'md:hidden'} onClick={handleTrendingDropDownClick} isDropDown={isTrending}/>
        </div>
        <div className={`flex flex-col gap-4 max-md:relative  max-md:flex-row max-md:w-full max-md:hidden `}>
          <div>
            <FilterDropDownBtn
              text={" Category Filter"}
              className="justify-between"
              onClick={handleDropDownCategory}
              isDropDown={isCategory}
            />
            <div
              className={`${
                isCategory ? "block" : "hidden"
              } categoryListContainer w-full h-[150px] overflow-y-auto bg-[#eeeeee] rounded-[8px] px-[10px] py-[10px] custom-scrollbar border max-sm:p-1 max-md:absolute`}
            >
              {/* Categories are dynamically appears here */}
              <div className="hover:bg-[#dfdfdf] hover:font-semibold transition-all duration-150 rounded-md  flex items-center font-medium gap-2 w-full max-xl:text-sm max-xl:font-semibold">
                      <input id='seeAll' type="checkbox" onChange={handleSeeAllSelected} checked={isSellAllSelected} />
                      <label
                        className="w-full text-nowrap text-ellipsis overflow-hidden block uppercase cursor-pointer"
                        htmlFor= 'seeAll'
                      >
                        See all
                      </label>
                    </div>
              {categories.length > 0
                ? categories.map((cat, index) => (
                    <div key={index} className="hover:bg-[#dfdfdf] hover:font-semibold transition-all duration-150 rounded-md flex items-center font-medium gap-2 w-full max-xl:text-sm max-xl:font-semibold">
                      <input id={cat} checked={selectedCategories.length ===  0 ? false : selectedCategories.includes(cat)} onChange={()=>{handleUpdateCategory(cat)}} type="checkbox" />
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
          <div>
            <FilterDropDownBtn
              text={"Filter by rating"}
              onClick={handleDropDownRating}
              isDropDown={isRating}
            />
            {/* Rating filter layout */}
            <div
              className={`${
                isRating ? "block" : "hidden"
              } ratingList text-[20px] bg-[#eeeeee] rounded-[8px] px-[10px] py-[10px] border max-sm:p-2 max-md:absolute max-md:w-full`}
            >
              {[ 
                { value: 4, label: "4⭐ & above"},
                { value: 3, label: "3⭐ & above" },
                { value: 2, label: "2⭐ & above" },
                { value: 1, label: "1⭐ & above" },
                { value: 0, label: "None of above", checked: true},
              ].map(({ value, label, checked = false }) => (
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
        </div>
      </div>
    );
  };

  export default Filter;
