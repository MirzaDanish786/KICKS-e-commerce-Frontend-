import React from "react";
import downArrow from "/src/assets/icons/downArrow.svg";
import logo from "/src/assets/images/Logo.png";
import search from "/src/assets/icons/search.svg";
import user from "/src/assets/icons/user.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";
import Overlay from "../reuseable/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedCategories, updateSelectedCategories } from "../../Redux/features/fetchAPI/fetchSlice";
const Navbar = () => {
  const [isMenDropDown, setIsMenDropDown] = useState(false);
  const [isWomenDropDown, setIsWomenDropDown] = useState(false);
  const [isMenHamburgerDropDown, setIsMenHamburgerDropDown] = useState(false);
  const [isWomenHamburgerDropDown, setIsWomenHamburgerDropDown] =
    useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const selectedCategories = useSelector(state => state.fetch_API.selectedCategories);
  const dispatch = useDispatch();
  const menRef = useRef(null);
  const womenRef = useRef(null);

  const hamburgerRef = useRef(null);
  const hamburgerIconRef = useRef(null);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  // Toggling of the drop down in navbar:
  const toggleMenIsDropDown = () => {
    if (isMenDropDown === false) {
      setIsMenDropDown(true);
      setIsWomenDropDown(false);
    } else {
      setIsMenDropDown(false);
    }
  };
  const toggleWomenIsDropDown = () => {
    if (isWomenDropDown === false) {
      setIsWomenDropDown(true);
      setIsMenDropDown(false);
    } else {
      setIsWomenDropDown(false);
    }
  };

  // Toggling of the drop down in Hamburger:
  const toggleMenHamburgerIsDropDown = () => {
    if (isMenHamburgerDropDown === false) {
      setIsMenHamburgerDropDown(true);
      setIsWomenHamburgerDropDown(false);
    } else {
      setIsMenHamburgerDropDown(false);
    }
  };
  const toggleWomenHamburgerIsDropDown = () => {
    if (isWomenHamburgerDropDown === false) {
      setIsWomenHamburgerDropDown(true);
      setIsMenHamburgerDropDown(false);
    } else {
      setIsWomenHamburgerDropDown(false);
    }
  };

  // Handle outside click from the drop down:
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !menRef.current.contains(e.target) &&
        !womenRef.current.contains(e.target) &&
        !hamburgerRef.current.contains(e.target) &&
        !hamburgerIconRef.current.contains(e.target)
      ) {
        setIsMenDropDown(false);
        setIsWomenDropDown(false);
        setIsHamburgerActive(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
  }, []);

  // Close the hamburger when screen size is greater then 768px:
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsHamburgerActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hamburger handle Active:
  const handleHamburgerOpen = () => {
    setIsHamburgerActive(true);
  };
  // Hamburger deactive
  const handleHamburgerClose = () => {
    setIsHamburgerActive(false);
  };
  // Navigate to the listing page and showt the desired result:
  const handleCategoryClick = (e) => {
    dispatch(resetSelectedCategories());
    dispatch(updateSelectedCategories(e.target.dataset.value));
    navigate('/listing_page');
    setIsHamburgerActive(false)
  }
  const handleNewDropClick =()=>{
    navigate('/listing_page', {state: {newDropRating: 4}})
    setIsHamburgerActive(false)
  }
  

  return (
    <header>
      {isHamburgerActive && <Overlay />}
      <nav
        className="w-[92%] bg-[#FAFAFA] mx-auto my-8 px-8 py-9 rounded-[24px] font-semibold max-xl:px-10 max-xl:py-6
        max-lg:px-5
        max-md:rounded-[12px]"
      >
        <ul className="flex justify-between items-center">
          {/* Hamburger Icon */}
          <li
            ref={hamburgerIconRef}
            className="hamburgerSection hidden
              max-md:block"
            onClick={handleHamburgerOpen}
          >
            <div className="hamburgerBtn w-6">
              <GiHamburgerMenu size={25} />
            </div>
          </li>

          {/* Hamburger Layout */}
          <div
            ref={hamburgerRef}
            className={`hamburgerLayout z-100 absolute bg-gray-200 top-0 -left-full transition-all duration-300 w-[50%] h-[100vh] flex-col gap-4 p-5 pt-7 flex ${
              isHamburgerActive ? "left-0" : "-left-full"
            }`}
          >
            {/* Logo */}
            <div className="max-md:w-20"><img className="object-contain w-full" src={logo} alt="" /></div>
            <div
              className="cancelBtn absolute right-5 top-5 p-2 bg-[#eeeeee] rounded-full"
              onClick={handleHamburgerClose}
            >
              <GiCancel size={25} />
            </div>
            <div className="divider border border-gray-400 w-full h-0"></div>

            <div onClick={handleNewDropClick} className="newDropsNav text-xl max-sm:text-sm">New Drops🔥</div>

            <div className="divider border border-gray-400 w-full h-0"></div>

            <div className="flex">
              <li className="relative cursor-pointer w-full">
                <div
                  className="hamburgerMenNav flex  items-center gap-2"
                  onClick={toggleMenHamburgerIsDropDown}
                >
                  <div className="text-xl  max-sm:text-sm">Men</div>
                  <img
                    className={`hamburgerWomenDropDownImage transition-all duration-150 ${
                      isMenHamburgerDropDown ? "rotate-180" : "rotate-0"
                    }`}
                    src={downArrow}
                    alt=""
                  />
                </div>
                <div
                  className={`hamburgerMenDropDown bg-gray-200 p-1 rounded-lg ${
                    isMenHamburgerDropDown ? "block" : "hidden"
                  } `}
                >
                  <ul className="p-2">
                    <li data-value="mens-shirts" onClick={handleCategoryClick} className="menDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400">
                      Mens Shirts
                    </li>

                    <li data-value="mens-shoes" onClick={handleCategoryClick} className="menDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400">
                      Mens Shoes
                    </li>
                    <li data-value="mens-watches" onClick={handleCategoryClick} className="menDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium">
                      Mens Watches
                    </li>
                  </ul>
                </div>
              </li>
            </div>

            <div className="divider border border-gray-400 w-full h-0"></div>

            <div className="flex">
              <li className=" relative cursor-pointer w-full">
                <div
                  className="hamburgerWomenNav flex items-center gap-2"
                  onClick={toggleWomenHamburgerIsDropDown}
                >
                  <div className="text-xl  max-sm:text-sm">Women</div>
                  <img
                    className={`hamburgerWomenDropDownImage transition-all duration-150 ${
                      isWomenHamburgerDropDown ? "rotate-180" : "rotate-0"
                    }`}
                    src={downArrow}
                    alt=""
                  />
                </div>

                <div
                  className={`hamburgerWomenDropDown bg-gray-200 p-1 rounded-lg ${
                    isWomenHamburgerDropDown ? "block" : "hidden"
                  }`}
                >
                  <ul>
                    <li data-value="womens-bags" onClick={handleCategoryClick} className="womenDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400">
                      Womens Bags
                    </li>
                    <li data-value="womens-dresses" onClick={handleCategoryClick} className="womenDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400">
                      Womens Dresses
                    </li>
                    <li data-value="womens-jewellery" onClick={handleCategoryClick} className="womenDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400">
                      Womens Jewellery
                    </li>
                    <li data-value="womens-shoes" onClick={handleCategoryClick} className="womenDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400">
                      Womens Shoes
                    </li>
                    <li data-value="womens-watches" onClick={handleCategoryClick} className="womenDropDownList hover:bg-gray-300 px-1 rounded-lg font-medium border-b border-gray-400 ">
                      Womens Watches
                    </li>
                  </ul>
                </div>
              </li>
            </div>
            {/* <div className="divider border border-gray-400 w-full h-0"></div> */}
          </div>

          {/* Left Section */}
          <li className="max-md:hidden">
            <div>
              <ul
                className="flex items-center gap-10
              max-lg:gap-3 max-lg:text-[13px]"
              >
                <li onClick={handleNewDropClick} className="cursor-pointer">New Drops🔥</li>
                <li>
                  <div
                    ref={menRef}
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={toggleMenIsDropDown}
                  >
                    <div>Men</div>
                    <div>
                      <img
                        className={`transition-all duration-150 ${isMenDropDown ? "rotate-180" : "rotate-0"}`}
                        src={downArrow}
                        alt=""
                      />
                    </div>
                  </div>

                  {/* MenDropDownLayout */}
                  <div
                    className={`hamburgerMenDropDown cursor-pointer bg-gray-200 p-1 rounded-lg shadow-lg absolute z-50 ${
                      isMenDropDown ? "block" : "hidden"
                    } `}
                  >
                    <ul className="p-1">
                      <li data-value="mens-shirts" onClick={handleCategoryClick} className="menDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                        Mens Shirts
                      </li>
                      <li data-value="mens-shoes" onClick={handleCategoryClick} className="menDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                        Mens Shoes
                      </li>
                      <li data-value="mens-watches" onClick={handleCategoryClick} className="menDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                        Mens Watches
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div
                    ref={womenRef}
                    className="flex items-center gap-1 cursor-pointer relative"
                    onClick={toggleWomenIsDropDown}
                  >
                    <div>Women</div>
                    <div>
                      <img
                        className={`transition-all duration-150 ${isWomenDropDown ? "rotate-180" : "rotate-0"}`}
                        src={downArrow}
                        alt=""
                      />
                    </div>

                    {/* WomenDorpDownLayout */}
                    <div
                      className={`hamburgerWomenDropDown bg-gray-200 p-1 rounded-lg absolute top-full z-50 text-nowrap shadow-lg ${
                        isWomenDropDown ? "block" : "hidden"
                      }`}
                    >
                      <ul className="p-1">
                        <li onClick={handleCategoryClick} data-value="womens-bags" className="womenDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                          Womens Bags
                        </li>
                        <li onClick={handleCategoryClick} data-value="womens-dresses" className="womenDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                          Womens Dresses
                        </li>
                        <li onClick={handleCategoryClick} data-value="womens-jewellery" className="womenDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                          Womens Jewellery
                        </li>
                        <li onClick={handleCategoryClick} data-value="womens-shoes" className="womenDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                          Womens Shoes
                        </li>
                        <li onClick={handleCategoryClick} data-value="womens-watches" className="womenDropDownList hover:bg-gray-300 px-1 rounded-sm p-1 font-medium">
                          Womens Watches
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          {/* Center Section */}
          <li>
            <div
              className="cursor-pointer max-lg:w-30 max-sm:w-24"
              onClick={handleLogoClick}
            >
              <img className="object-contain w-full" src={logo} alt="" />
            </div>
          </li>
          {/* Right Section */}
          <li
            className="flex items-center gap-10 pl-20
          max-lg:gap-5 max-md:p-0"
          >
            <div className="max-md:hidden">
              <img src={search} alt="" />
            </div>
            <div className=" max-sm:w-4">
              <img className="w-full object-contain" src={user} alt="" />
            </div>
            <div className="px-3 py-1 rounded-full bg-[#FFA52F] max-sm:px-2 max-sm:py-0">
              0
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
